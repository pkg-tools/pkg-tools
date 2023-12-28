import { Octokit } from '@octokit/rest';
import path from 'node:path';

import { readFile } from 'fs/promises';

import { makeDedicatedLockfile } from '@pnpm/make-dedicated-lockfile';

import { resolveWorkspaceDependencies } from '@dopt/resolve-workspace-dependencies';

import { TOPOFTREE } from '@dopt/topoftree';

import micromatch from 'micromatch';

import { promisify } from 'node:util';
import { exec as execAsync } from 'node:child_process';
const exec = promisify(execAsync);

import { PackageJson } from 'type-fest';

import { initialize } from './repo';
import { readFileSync } from 'node:fs';

export async function sync() {
  const { name, version, repository } = JSON.parse(
    readFileSync(path.resolve(process.cwd(), './package.json'), 'utf8')
  ) as PackageJson;

  const octokit = new Octokit({
    auth: process.env.PKG_SYNC_PAT,
  });

  if (!repository || typeof repository === 'string' || !repository.url) {
    throw new Error(
      'Pacakges using the `sync` CLI need to defined the repository property with a `url` field'
    );
  }

  const match = repository.url.match(/https:\/\/github.com\/(.*)\/(.*).git/);

  if (!match) {
    throw new Error(
      'The repository url field should be an https cloneable url i.e. https://github.com/bobs/burgers.git'
    );
  }

  const [, org, repo] = match;

  const owner = org;

  const repos = await octokit.repos.listForOrg({
    org,
  });

  const targetRepo = repos.data.find(
    (repo) => repo.clone_url === repository.url
  );

  if (!targetRepo) {
    await initialize({
      owner,
      org,
      repo,
    });
  }

  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/main`,
  });

  // Get the tree for the current SHA.
  const {
    data: { tree },
  } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: ref.object.sha,
    recursive: 'true',
  });

  const syncignore = tree.find(({ path }) => {
    return (path as string) === '.syncignore';
  });

  if (!syncignore) {
    throw new Error('No syncignore found in target repo');
  }

  const {
    data: { content: syncIgnoreFile },
  } = await octokit.git.getBlob({
    owner,
    repo,
    file_sha: syncignore?.sha as string,
  });

  // Get all the files tracked by git
  const filePaths = (await exec('git ls-files .')).stdout
    .split('\n')
    .filter((f) => f);

  const ignorePatterns: string[] = atob(syncIgnoreFile)
    .split('\n')
    .filter((line) => line);

  // Mark files the following files for deletion if either
  // - The file is not ignored by the target repo's .syncignore
  // - The file is  present in target but not source
  const filesToDelete = tree
    .filter(({ mode }) => {
      // filter out directories
      return mode !== '040000';
    })
    .filter(({ path }) => !filePaths.includes(path as string))
    .filter(({ path }) => !micromatch.isMatch(path as string, ignorePatterns));

  // Resolve workspace dependencies to their current version
  await resolveWorkspaceDependencies(name as string);

  // ::SPECIAL CASE::
  // Copy the monorepos top-level package.json's
  // packageManager field to ensure consistent builds
  // in target repo
  try {
    const { packageManager } = JSON.parse(
      await readFile(path.join(TOPOFTREE, 'package.json'), 'utf8')
    );
    await exec(`pnpm pkg set packageManager=${packageManager}`);
  } catch (e) {
    console.warn(
      "Ran into issues while copying the monorepo's packageManager field",
      e
    );
  }

  const fileBlobs = [];
  for (const filePath of filePaths) {
    try {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: await readFile(path.resolve(filePath), 'utf8'),
        encoding: 'utf8',
      });
      fileBlobs.push(blob);
    } catch (e) {
      console.log(`Error while creating file blob for file ${filePath}`, e);
    }
  }

  // ::SPECIAL CASE::
  // Add deletions as blobs w/ null SHAs
  for (const fileToDelete of filesToDelete) {
    fileBlobs.push({
      url: fileToDelete.url as string,
      sha: null,
    });
    filePaths.push(fileToDelete.path as string);
  }

  // ::SPECIAL CASE::
  // Create a lockfile for this package
  try {
    await makeDedicatedLockfile(TOPOFTREE, process.cwd());
    filePaths.push('pnpm-lock.yaml');
    const { data: lockfile } = await octokit.git.createBlob({
      owner,
      repo,
      content: await readFile(path.resolve('pnpm-lock.yaml'), 'utf8'),
      encoding: 'utf8',
    });
    fileBlobs.push(lockfile);
  } catch (e) {
    console.warn('Error while create a dedicated lockfile for this package', e);
  }

  // ::SPECIAL CASE::
  // Include the monorepos .nvmrc to ensure consitent
  // builds in the downstream repo's CI
  try {
    filePaths.push('.nvmrc');
    const { data: nvmrc } = await octokit.git.createBlob({
      owner,
      repo,
      content: await readFile(path.join(TOPOFTREE, '.nvmrc'), 'utf8'),
      encoding: 'utf8',
    });
    fileBlobs.push(nvmrc);
  } catch (e) {
    console.warn("Ran into issues while porting the monorepo's .nvmrc file", e);
  }

  const { data: commit } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: ref.object.sha,
  });

  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    tree: fileBlobs.map(({ sha }, index) => ({
      path: filePaths[index],
      mode: `100644`,
      type: `blob`,
      sha,
    })),
    base_tree: commit.tree.sha,
  });

  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: `Release ${version}`,
    tree: newTree.sha,
    parents: [ref.object.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/main`,
    sha: newCommit.sha,
  });

  await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: `v${version}`,
    target_commitish: newCommit.sha,
  });
}

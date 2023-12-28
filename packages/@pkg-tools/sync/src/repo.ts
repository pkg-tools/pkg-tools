import { Octokit } from '@octokit/rest';

import { CI, SYNC_IGNORE } from './templates';

export async function initialize({
  owner,
  org,
  repo,
}: {
  owner: string;
  org: string;
  repo: string;
}) {
  const octokit = new Octokit({
    auth: process.env.PKG_SYNC_PAT,
  });

  await octokit.repos.createInOrg({ org, name: repo, auto_init: true });
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/main`,
  });

  const { data: commit } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: ref.object.sha,
  });

  const { data: githubActionFile } = await octokit.git.createBlob({
    owner,
    repo,
    content: CI,
    encoding: 'utf8',
  });

  const { data: syncignore } = await octokit.git.createBlob({
    owner,
    repo,
    content: SYNC_IGNORE,
    encoding: 'utf8',
  });

  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    tree: [
      {
        path: `.github/workflows/ci.yml`,
        mode: `100644`,
        type: `blob`,
        sha: githubActionFile.sha,
      },
      {
        path: `.syncignore`,
        mode: `100644`,
        type: `blob`,
        sha: syncignore.sha,
      },
    ],
    base_tree: commit.tree.sha,
  });

  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: `Initial commit`,
    tree: newTree.sha,
    parents: [ref.object.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/main`,
    sha: newCommit.sha,
  });
}

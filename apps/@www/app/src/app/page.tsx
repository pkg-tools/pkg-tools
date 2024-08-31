'use client'

import Image from "next/image";
import * as styles from "./page.css";

import { Code } from "@/components";

import { IconBrandGithubFilled, IconPoint, IconBrandYarn, IconBrandPnpm, IconBrandNpm } from "@tabler/icons-react";
import {useState} from "react";

const createPkg = `npm create @pkg-tools/pkg`;


interface Tools {
  build: boolean;
  clean: boolean;
  format: boolean;
  lint: boolean;
}


const installScript = ({build, clean, format, lint}: Tools) => `npm install -D \\
  @pkg-tools/config  \\
  ${build ? '@pkg-tools/build  \\' : ''}
  ${clean ?'@pkg-tools/clean  \\' : ''}
  ${format ?'@pkg-tools/format \\' : ''}
  ${lint ?'@pkg-tools/lint   \\' : ''}
;\n`.replace(/^\s*\n/gm, '');

const addFormatConfigScript = () => `
echo "const { getConfig } = require("@pkg-tools/format/config");\n
module.exports = getConfig();" > .prettierrc.cjs;
`.replace(/^\s*\n/gm, '');

const addLintConfigScript = () => `
echo "const { getConfig } = require("@pkg-tools/lint/config");\n
module.exports = getConfig();" > .eslintrc.cjs;
`.replace(/^\s*\n/gm, '');

const useClis = ({build, clean, format, lint}: Tools) => `npm pkg set  \\
  ${build ?'scripts.build="build"  \\' : ''}
  ${clean ?'scripts.clean="clean"  \\' : ''}
  ${build ?'scripts.dev="build -w"  \\' : ''}
  ${format ?'scripts.format="format"  \\' : ''}
  ${lint ?'scripts.lint="lint"  \\' : ''}
;`.replace(/^\s*\n/gm, '');

const pkgConfig = ({build, clean, format, lint}: Tools) =>  `import { 
  defineConfig 
} from "@pkg-tools/config";

export default defineConfig({
  ${build ? `
  build: {
    entries: ["src/index"],
    sourcemap: true,
  },`: ''}
  ${clean ? `
  clean: {
    directory: "./dist",
  },`: ''}
  ${format ? `
  format: {
    semi: true,
    singleQuote: true,
  },`: ''}
  ${lint ? `
  lint: {
    rules: {
      "no-unused-vars": 0,
    },
  },`: ''}
});
`.replace(/^\s*\n/gm, '');

export default function Home() {

  const [packageManager, setPackageManager] = useState<'npm'|'pnpm'|'yarn'>('npm')


  const [build, setBuild] = useState<boolean>(true)
  const [clean, setClean] = useState<boolean>(true)
  const [format, setFormat] = useState<boolean>(true)
  const [lint, setLint] = useState<boolean>(true)
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.hero}>
          <a href="https://github.com/pkg-tools/pkg-tools">
            <h1 className={styles.h1}>pkg-tools 
              <IconBrandGithubFilled /> 
            </h1>
          </a>
          <h2 className={styles.h2}>
            A build toolchain for{" "}
            <Image
              src="/typescript-logo.svg"
              alt="TypeScript Logo"
              width={18}
              height={18}
              priority
            />{" "}
            projects
          </h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.h3}>
            Tools are
          </div>
          <div className={styles.h3}>
            <IconPoint />
            standalone, install only what you need
          </div>
          <div className={styles.h3}>
            <IconPoint />
            configured in typescript
          </div>
          <div className={styles.h3}>
            <IconPoint />
            wrappers around best-of-breed tools
          </div>
          <div className={styles.h3}>
            <IconPoint />
            usable as a CLI or programmatically
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.h2}>{'>'} Getting started</h3>
          <div className={styles.subsection}>
            <h4>Starting fresh 🫧</h4>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.code}>
                  <Code language="shell">{createPkg}</Code>
                </div>
              </div>
            </div>
            <div className={styles.helpText}><a href="https://github.com/pkg-tools/pkg-tools/tree/main/create-pkg">Read more here</a></div>
          </div>
          <div>
            <h4>Updating an existing 📦</h4>
            <div>
            <div className={styles.toolSelection}>
              <div className={styles.tool}>
                <input type="radio" id="npm" name="npm" value="npm" checked={packageManager === 'npm'} />
                <label for="npm"><IconBrandNpm /></label>
              </div>
              <div className={styles.tool}>
                <input type="radio" id="pnpm" name="pnpm" value="pnpm" checked={packageManager === 'pnpm'} />
                <label for="npm"><IconBrandPnpm /></label>
              </div>
              <div className={styles.tool}>
                <input type="radio" id="npm" name="yarn" value="yarn" checked={packageManager === 'yarn'} />
                <label for="yarn"><IconBrandYarn /></label>
              </div>
            </div>
            </div>
            <div className={styles.toolSelection}>
              <div className={styles.tool}>
                <input checked={build} onClick={() => setBuild(!build)} type="checkbox" />
                <label>build</label>
              </div>
              <div className={styles.tool}>
                <input checked={clean} onClick={() => setClean(!clean)} type="checkbox" />
                <label>clean</label>
              </div>
              <div className={styles.tool}>
                <input checked={format} onClick={() => setFormat(!format)} type="checkbox" />
                <label>format</label>
              </div>
              <div className={styles.tool}>
                <input checked={lint} onClick={() => setLint(!lint)} type="checkbox" />
                <label>lint</label>
              </div>
            </div>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepTitle}>1. Install</div>
                <div className={styles.code}>
                  <Code language="shell">
                    {[
                      installScript({ build, clean ,format, lint }),
                      format && addFormatConfigScript(),
                      lint && addLintConfigScript()
                    ].filter(n => n).join('\n')}
                  </Code>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>2. Use CLIs</div>
                <div className={styles.code}>
                  <Code language="shell">{useClis({ build, clean ,format, lint })}</Code>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>3. Configure</div>
                <div className={styles.code}>
                  <Code language="tsx">{pkgConfig({ build, clean ,format, lint })}</Code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      



      <footer className={styles.footer}>
        <a
          className={styles.byCrowProse}
          href="https://www.crowprose.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A project by 
          <Image
            src="/crow.png"
            alt="CrowProse Logo"
            width={25}
            height={23}
            priority
          />
        </a>
      </footer>
    </main>
  );
}

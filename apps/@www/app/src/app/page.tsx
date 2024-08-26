import Image from "next/image";
import * as styles from "./page.css";

import { Code } from "@/components";

import { IconBrandGithubFilled, IconPoint } from "@tabler/icons-react";

const createPkg = `npm create @pkg-tools/pkg`;


const installScript = `npm install -D \\
  @pkg-tools/config  \\
  @pkg-tools/build  \\
  @pkg-tools/clean  \\
  @pkg-tools/format \\
  @pkg-tools/lint;
`;

const useClis = `npm pkg set  \\
  scripts.build="build"   \\
  scripts.clean="clean"   \\
  scripts.dev="build -w"  \\
  scripts.format="format" \\
  scripts.lint="lint";
`;

const pkgConfig = `import { 
  defineConfig 
} from "@pkg-tools/config";

export default defineConfig({
  build: {
    entries: ["src/index"],
    sourcemap: true,
  },
  clean: {
    directory: "./dist",
  },
  format: {
    semi: true,
    singleQuote: true,
  },
  lint: {
    rules: {
      "no-unused-vars": 0,
    },
  },
});
`;

export default function Home() {
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
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepTitle}>1. Install</div>
                <div className={styles.code}>
                  <Code language="shell">{installScript}</Code>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>2. Use CLIs</div>
                <div className={styles.code}>
                  <Code language="shell">{useClis}</Code>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepTitle}>3. Configure</div>
                <div className={styles.code}>
                  <Code language="tsx">{pkgConfig}</Code>
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

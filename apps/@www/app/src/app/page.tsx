import Image from "next/image";
import styles from "./page.module.css";

import { Code } from "@/components";

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
          <h1>pkg-tools</h1>
          <p>
            A build toolchain for{" "}
            <Image
              src="/typescript-logo.svg"
              alt="TypeScript Logo"
              width={18}
              height={18}
              priority
            />{" "}
            projects. Configured via a single{" "}
            <Image
              src="/typescript-logo.svg"
              alt="TypeScript Logo"
              width={18}
              height={18}
              priority
            />{" "}
            file at the root of your project.
          </p>
        </div>
      </div>
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
      <footer className={styles.footer}>
        <a
          className={styles.byDopt}
          href="https://www.dopt.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A project by{" "}
          <Image
            src="/dopt-logo.svg"
            alt="Dopt Logo"
            className={styles.doptLogo}
            width={100}
            height={24}
            priority
          />
        </a>
      </footer>
    </main>
  );
}

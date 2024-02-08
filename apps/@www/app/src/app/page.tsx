import Image from "next/image";
import styles from "./page.module.css";

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
            projects. Configured via a single, typed configuration file.
          </p>
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

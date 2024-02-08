"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";
import { useInView } from "framer-motion";
import { CopyIcon } from "../../components";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.info}>
            {/*<VersionBadge />*/}
            <h1>PKG TOOLS</h1>
            <p>A TS project build toolchain with a typed configuration.</p>
          </div>

          <div className={styles.buttons}>
            <InstallButton />
            {/*<GitHubButton />*/}
          </div>
        </div>

        {/*<Codeblock />*/}
      </div>
      <Footer />
    </main>
  );
}

function InstallButton() {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <button
      className={""}
      onClick={async () => {
        try {
          await navigator.clipboard
            .writeText(`npm install -D @pkg-tools/build @pkg-tools/clean @pkg-tools/config
      @pkg-tools/format @pkg-tools/lint`);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        } catch (e) {}
      }}
    >
      npm install -D @pkg-tools/*
      <span>{copied ? "Copied" : <CopyIcon />}</span>
    </button>
  );
}

function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "100px",
  });

  return (
    <footer ref={ref} className={styles.footer} data-animate={isInView}>
      <div className={styles.footerText}>
        Created by{" "}
        <a
          href="https://www.dopt.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/dopt-logo.svg" alt="Dopt logo" />
        </a>
      </div>
    </footer>
  );
}

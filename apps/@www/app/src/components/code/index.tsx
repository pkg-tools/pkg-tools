"use client";
import copy from "copy-to-clipboard";
import { Highlight, HighlightProps, themes } from "prism-react-renderer";
import styles from "./code.module.css";

import { IconCopy } from "@tabler/icons-react";

export function Code({
  children,
  language,
}: {
  children: string;
  language: HighlightProps["language"];
}) {
  return (
    <Highlight theme={themes.github} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} ${styles.root}`}
          style={{
            ...style,
            height: "100%",
          }}
        >
          <div className={styles.controls}>
            <a
              className={styles.copy}
              aria-label="Copy Code"
              onClick={() => {
                copy(children);
              }}
            >
              <IconCopy />
            </a>
          </div>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={i} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

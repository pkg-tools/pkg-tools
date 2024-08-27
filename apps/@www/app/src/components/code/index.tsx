"use client";
import copy from "copy-to-clipboard";
import { Highlight, HighlightProps, themes } from "prism-react-renderer";
import styles from "./code.module.css";

import { IconCopy } from "@tabler/icons-react";
import {Key} from "react";

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
              <IconCopy width={16} height={16}/>
            </a>
          </div>
          {tokens.map((line, i) => {
            const { key, ...rest }  = getLineProps({ line, key: i})
            return (
              <div key={key as Key} {...rest}>
                {line.map((token, k) => {
                  const { key, ...rest }  = getTokenProps({ token, key: k })
                  return (
                    <span key={key as Key} {...rest} />
                  )
                })}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  );
}

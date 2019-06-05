import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { transparentize } from "polished";
import theme from "../../config/theme";

const customTheme = {
  plain: {
    backgroundColor: theme.colors.backgroundColor
  },
  styles: [
    {
      types: ["atom"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["prolog", "doctype", "cdata", "punctuation"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["comment"],
      style: {
        opacity: 0.7,
        color: theme.colors.bg,
        backgroundColor: theme.colors.primary,
        fontWeight: "bold",
        textDecoration: "underline"
      }
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["property", "function"],
      style: {
        fontWeight: "bold",
        opacity: 0.7
      }
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {}
    },
    {
      types: ["attr-name"],
      style: {}
    },
    {
      types: [
        "boolean",
        "string",
        "entity",
        "url",
        "attr-value",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule"
      ],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["placeholder", "variable", "builtin", "keyword"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["keyword"],
      style: {
        opacity: 0.7
      }
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through"
      }
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline"
      }
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic"
      }
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold"
      }
    },
    {
      types: ["important"],
      style: {}
    }
  ]
};

const Code = ({ codeString, language, ...props }) => {
  if (props["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={customTheme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={customTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;

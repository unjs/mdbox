import type { Token, Options } from "markdown-it";
import type { Node, ParsedTree, Parser, Type } from "../types";

/**
 *
 * Create parser with [markdown-it](https://github.com/markdown-it/markdown-it).
 *
 * **WARNING**: The returned tree structure is unstable.
 *
 * @example
 *
 * ```ts
 * import { initMarkdownItParser } from "omark/parser";
 * const parser = await initMarkdownItParser();
 * const { tree } = parser.parse("# Hello, *world*!");
 * ```
 *
 * @group parsing_utils
 */
export async function initMarkdownItParser(
  options: Options = {},
): Promise<Parser> {
  const _markdownit = await import("markdown-it").then((r) => r.default || r);
  const markdownit = _markdownit({
    linkify: true,
    ...options,
  });

  return {
    parse: (md: string) => {
      const tokens = markdownit.parse(md, {});
      const tree = _normalizeTree(tokens);
      return {
        // _test: tokens,
        tree,
      };
    },
  };
}

function _normalizeTree(tokens: Token[]): ParsedTree {
  let node: Node = {
    type: "" as Type,
    children: [],
  };

  const stack: Node[] = [];

  for (const token of tokens) {
    // Tag open
    if (token.nesting === 1 /* tag open */) {
      const _node: Node = {
        type: getType(token),
        children: [],
      };
      if (token.attrs) {
        _node.props = Object.fromEntries(token.attrs);
        if (_node.props.style) {
          const textAlign = /^text-align:\s*(\w+);?$/.exec(_node.props.style);
          if (textAlign) {
            delete _node.props.style;
            _node.props.align = textAlign[1];
          }
        }
      }
      node.children ||= [];
      node.children.push(_node);
      stack.push(node);
      node = _node;
      continue;
    }

    // Tag close
    if (token.nesting === -1 /* tag close */) {
      if (node.type === "li" && node.children) {
        node.children = node.children.flatMap((child) => {
          if (typeof child !== "string" && child.type === "p") {
            return child?.children || [];
          }
          return child;
        });
      }
      node = stack.pop() || node;
      continue;
    }

    switch (token.type) {
      case "text": {
        if (token.content) {
          node.children ||= [];
          node.children.push(token.content);
        }
        break;
      }
      case "softbreak": {
        node.children ||= [];
        node.children.push("\n");
        break;
      }
      case "fence": {
        node.children ||= [];
        node.children.push({
          type: "code",
          children: [token.content],
          props: {
            lang: token.info,
          },
        });
        break;
      }
      case "image": {
        const imgProps = Object.fromEntries(token.attrs || []);
        node.children ||= [];
        node.children.push({
          type: "img",
          props: {
            ...imgProps,
            alt: imgProps.alt || token.content,
          },
        });
        break;
      }
      default: {
        if (token.children && token.children.length > 0) {
          node.children ||= [];
          node.children.push(..._normalizeTree(token.children));
        } else {
          const _node: Node = { type: getType(token) };
          const content = token.content;
          if (content) {
            _node.children = [content];
          }
          node.children ||= [];
          node.children.push(_node);
        }
      }
    }
  }

  return node.children || [];
}

const tagMap: Partial<Record<string, Type>> = {
  s: "del",
};

function getType(token: Token): Type {
  return tagMap[token.tag as string] || (token.tag as Type);
}

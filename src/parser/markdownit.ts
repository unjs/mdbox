import type { Token } from "markdown-it";
import type { Node, Tag } from "./types";

/**
 *
 * Parse markdown into simplified object using [markdown-it](https://github.com/markdown-it/markdown-it).
 *
 * **WARNING!**: The returned tree structure is not finalized and is subject to change.
 *
 * @example
 *
 * ```ts
 * import { parseWithMarkdownit } from "omark/parser";
 * const parsed = await parseWithMarkdownit("# Hello, *world*!");
 * ```
 *
 *
 * @param markdown Markdown string
 * @returns Parsed tree
 *
 * @group parsing_utils
 */
export async function parseWithMarkdownit(markdown: string): Promise<Node[]> {
  const markdownit = await import("markdown-it").then((r) => r.default || r);
  const md = markdownit().enable("image");
  const tokens = md.parse(markdown, {});

  const tree = convertTokensToTree(tokens);

  return tree;
}

function convertTokensToTree(tokens: Token[]): Node[] {
  let node: Node = {
    tag: "" as Tag,
    children: [],
  };

  const stack: Node[] = [];

  for (const token of tokens) {
    if (token.nesting === 1 /* tag open */) {
      const _node: Node = {
        tag: token.tag as Tag,
        children: [],
      };
      if (token.attrs) {
        _node.attrs = Object.fromEntries(token.attrs);
      }
      node.children ||= [];
      node.children.push(_node);
      stack.push(node);
      node = _node;
      continue;
    }

    if (token.nesting === -1 /* tag close */) {
      if (node.tag === "li" && node.children) {
        node.children = node.children.flatMap((child) => {
          if (typeof child !== "string" && child.tag === "p") {
            return child?.children || [];
          }
          return child;
        });
      }
      node = stack.pop() || node;
      continue;
    }

    if (token.children && token.children.length > 0) {
      node.children ||= [];
      node.children.push(...convertTokensToTree(token.children));
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
          tag: "code",
          children: [token.content],
          attrs: {
            lang: token.info,
          },
        });
        break;
      }
      default: {
        const _node: Node = { tag: token.tag as Tag };
        const content = token.content;
        if (content) {
          _node.children = [content];
        }
        node.children ||= [];
        node.children.push(_node);
      }
    }
  }

  return node.children || [];
}

function normalizeList(children: Node[]) {
  return children.flatMap((child) => {
    if (child.tag === "p") {
      return child.children;
    }
    return child;
  });
}

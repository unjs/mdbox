import type { Token } from "markdown-it";
import type { Node } from "./types";

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
 * const parsed = await parseWithMarkdownit("# Jobs\nStay _foolish_, stay **hungry**! (_[apple](https://apple.com)_)");
 * ```
 *
 *
 * @param markdown Markdown string
 * @returns Parsed tree
 *
 * @group parsing_utils
 */
export async function parseWithMarkdownit(markdown: string) {
  const markdownit = await import("markdown-it").then((r) => r.default || r);
  const md = markdownit().enable("image");
  const tokens = md.parse(markdown, {});

  const tree = convertTokensToTree(tokens);

  return tree;
}

function convertTokensToTree(tokens: Token[]): Node[] {
  let node: Node = {
    type: "root",
  };

  const stack: Node[] = [];

  for (const token of tokens) {
    if (token.nesting === 1 /* tag open */) {
      const _node: Node = {
        type: token.tag as Node["type"],
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
      node = stack.pop() || node;
      continue;
    }

    if (token.children && token.children.length > 0) {
      node.children ||= [];
      node.children.push(...convertTokensToTree(token.children));
    } else {
      node.children ||= [];
      node.children.push({
        type: token.type as Node["type"],
        content: token.content,
      });
    }
  }

  return node.children || [];
}

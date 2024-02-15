import type { Token } from "markdown-it";
import type { Block } from "./types";

/**
 *
 * Parse markdown into simplified object using [markdown-it](https://github.com/markdown-it/markdown-it).
 *
 * **WARNING!**: The returned tree structure is not finalized and is subject to change.
 *
 * @example
 *
 * ```ts
import { parseWithMarkdownit } from "omark/parser";
const parsed = await parseWithMarkdownit("# Jobs\nStay _foolish_, stay **hungry**! (_[apple](https://apple.com)_)");
// [
//   {
//     "type": "h1",
//     "children": [
//       "Jobs"
//     ]
//   },
//   {
//     "type": "p",
//     "children": [
//       "Stay ",
//       {
//         "type": "em",
//         "children": [
//           "foolish"
//         ]
//       },
//       ", stay ",
//       {
//         "type": "strong",
//         "children": [
//           "hungry"
//         ]
//       },
//       "! ",
//       {
//         "type": "a",
//         "children": [
//           "(apple)"
//         ],
//         "attrs": {
//           "href": "https://apple.com"
//         }
//       }
//     ]
//   }
// ]
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
  const md = markdownit("commonmark");
  const tokens = md.parse(markdown, {});
  const tree = convertTokensToTree(tokens);
  return tree;
}

function convertTokensToTree(tokens: Token[]) {
  const blocks: (Block | string)[] = [];

  let block: Block | undefined;

  for (const token of tokens) {
    // Tag open
    if (token.type.endsWith("_open")) {
      if (block) {
        blocks.push(block);
      }
      block = {
        type: token.tag,
        children: [],
        attrs: token.attrs ? Object.fromEntries(token.attrs) : undefined,
      };
      continue;
    }

    // Tag close
    if (token.type.endsWith("_close")) {
      if (block) {
        blocks.push(block);
      }
      block = undefined;
      continue;
    }

    // Block with children
    if (token.children && token.children.length > 0) {
      if (block) {
        block.children.push(...convertTokensToTree(token.children));
      } else {
        if (block) {
          blocks.push(block);
          block = undefined;
        }
        blocks.push(...convertTokensToTree(token.children));
      }
      continue;
    }

    // HTML inline
    if (token.type === "html_inline") {
      if (block?.type === "html") {
        block.children.push(token.content);
        block.children = [block.children.join("")];
        blocks.push(block);
        block = undefined;
      } else {
        block = {
          type: "html_inline",
          children: [token.content],
        };
      }
      continue;
    }

    // Content
    if (block) {
      block.children.push(token.content);
    } else if (token.type === "text") {
      blocks.push(token.content);
    } else {
      blocks.push({
        type: token.type,
        children: [token.content],
      });
    }
  }

  if (block) {
    blocks.push(block);
  }

  return blocks;
}

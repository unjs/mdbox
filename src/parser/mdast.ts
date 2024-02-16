import type { RootContent, Root } from "mdast";
import type { Node, Tag } from "./types";

/**
 *
 * Parse markdown into simplified object using https://github.com/syntax-tree/mdast-util-from-markdown
 *
 * **WARNING!**: The returned tree structure is not finalized and is subject to change.
 *
 * @example
 *
 * ```ts
 * import { parseWithMdast } from "omark/parser";
 * const parsed = await parseWithMdast("# Hello, *world*!");
 * ```
 *
 *
 * @param markdown Markdown string
 * @returns Parsed tree
 *
 * @group parsing_utils
 */
export async function parseWithMdast(markdown: string): Promise<Node[]> {
  const fromMarkdown = await import("mdast-util-from-markdown").then(
    (r) => r.fromMarkdown || r.default || r,
  );
  const root = fromMarkdown(markdown, undefined, {});

  return normalizeNode(root).children as Node[];
}

function normalizeNode(_node: Root | RootContent): Node {
  const tag = getTag(_node);
  const node: Node = {
    tag,
  };
  if ("children" in _node) {
    if (_node.children.length > 0) {
      node.children = _node.children.map((c) => normalizeNode(c));
      if (tag === "p" && !node.children.some((c) => typeof c !== "string")) {
        node.children = [node.children.join("")];
      }
    }

    if (_node.type === "link") {
      node.attrs = {
        href: _node.url,
      };
    }
  } else if ("value" in _node) {
    if (_node.type === "text" || _node.type === "html") {
      return _node.value === "\n" ? { tag: "br" } : _node.value;
    } else if (_node.value) {
      node.children = [_node.value];
    }
  }
  return node;
}

const tagMap: Partial<Record<string, Tag>> = {
  blockquote: "blockquote",
  strong: "strong",
  table: "table",
  break: "br",
  code: "code",
  delete: "s",
  emphasis: "em",
  heading: "h1",
  inlineCode: "code",
  link: "a",
  listItem: "li",
  paragraph: "p",
  tableRow: "tr",
  tableCell: "td",
  thematicBreak: "hr",
};

function getTag(node: Root | RootContent): Tag {
  if (node.type === "list") {
    return node.ordered ? "ol" : "ul";
  }
  return tagMap[node.type] || (node.type as Tag);
}

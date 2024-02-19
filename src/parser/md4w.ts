import type { MDTree, MDNode } from "md4w";
import type { Node, ChildNode, Tag } from "./types";

/**
 *
 * Parse markdown into simplified object using https://github.com/ije/md4w
 *
 * **WARNING!**: The returned tree structure is not finalized and is subject to change.
 *
 * @example
 *
 * ```ts
 * import { parseWithMd4w } from "omark/parser";
 * const parsed = await parseWithMd4w("# Hello, *world*!");
 * ```
 *
 *
 * @param markdown Markdown string
 * @returns Parsed tree
 *
 * @group parsing_utils
 */
export async function parseWithMd4w(markdown: string): Promise<ChildNode[]> {
  const { mdToJSON, init } = await import("md4w");
  await init();
  const tree = mdToJSON(markdown, {});
  return normalizeTree(tree);
}

function normalizeTree(tree: MDTree | MDNode): ChildNode[] {
  const nodes: ChildNode[] = [];
  if (!tree.children) {
    return nodes;
  }
  for (const child of tree.children) {
    if (typeof child === "string") {
      nodes.push(child);
      continue;
    }
    const node: Node = {
      tag: mapNodeType(child.type),
    };
    if (child.children) {
      node.children =
        node.tag === "code" ? [child.children.join("")] : normalizeTree(child);
    }
    if (child.props) {
      node.attrs = child.props;
    }
    nodes.push(node);
  }
  return nodes;
}

const nodeTypes: Record<number, Tag> = {
  1: "blockquote",
  2: "ul",
  3: "ol",
  4: "li",
  5: "hr",
  7: "code",
  // 8: "html",
  9: "p",
  10: "table",
  // 11: "tead",
  // 12: "tbody",
  13: "tr",
  14: "th",
  15: "td",
  21: "h1",
  22: "h2",
  23: "h3",
  24: "h4",
  25: "h5",
  26: "h6",
  30: "em",
  31: "strong",
  32: "a",
  // 33: "img",
  34: "code",
  // 35: "del",
  // 36: "latexmath",
  // 37: "latexmath_display",
  // 38: "wikilink",
  // 39: "u",
};
function mapNodeType(type: number): Tag {
  return nodeTypes[type];
}

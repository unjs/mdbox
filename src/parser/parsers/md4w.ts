import type { MDTree, MDNode, Options } from "md4w";
import type { Node, Type, Parser, ParsedTree } from "../types";

/**
 *
 * Create parser with [md4w](https://github.com/ije/md4w).
 *
 * **WARNING**: The returned tree structure is unstable.
 *
 * @example
 *
 * ```ts
 * import { initMd4wParser } from "omark/parser";
 * const parser = await initMd4wParser();
 * const { tree } = parser.parse("# Hello, *world*!");
 * ```
 *
 * @group parsing_utils
 */
export async function initMd4wParser(opts: Options = {}): Promise<Parser> {
  const { mdToJSON, init } = await import("md4w");
  await init();

  return {
    parse: (md: string) => {
      const res = mdToJSON(md, opts);
      const tree = _normalizeTree(res);
      return {
        // _test: res,
        tree,
      };
    },
  };
}

function _normalizeTree(tree: MDTree | MDNode): ParsedTree {
  const nodes: ParsedTree = [];
  if (!tree.children) {
    return nodes;
  }
  for (const child of tree.children) {
    if (typeof child === "string") {
      nodes.push(child);
      continue;
    }
    if ((child.type as any) === 8 /* html */) {
      nodes.push(child.children?.join("") || "");
      continue;
    }
    const node: Node = {
      type: mapNodeType(child.type),
    };
    if (child.children) {
      node.children =
        node.type === "code"
          ? [child.children.join("")]
          : _normalizeTree(child);
      if (!node.children.some((n) => typeof n !== "string")) {
        node.children = [node.children.join("")];
      }
    }
    if (child.props) {
      node.props = child.props as any;
    }
    nodes.push(node);
  }

  return nodes;
}

const nodeTypes: Record<number, Type> = {
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
  33: "img",
  34: "code",
  // 35: "del",
  // 36: "latexmath",
  // 37: "latexmath_display",
  // 38: "wikilink",
  // 39: "u",
};

function mapNodeType(type: number): Type {
  return nodeTypes[type] || type;
}

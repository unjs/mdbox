import type { MDTree, MDNode, Options } from "md4w";
import type { Node, Type, Parser, ParsedTree } from "../types";
import { mergeStrings } from "../_utils";

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
      const res = mdToJSON(md, {
        parseFlags: [
          "DEFAULT",
          "PERMISSIVE_WWW_AUTO_LINKS",
          "PERMISSIVE_EMAIL_AUTO_LINKS",
          "STRIKETHROUGH",
        ],
        ...opts,
      });
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
      nodes.push(child.children?.join("").trimEnd() || "");
      continue;
    }
    const node: Node = {
      type: mapNodeType(child.type),
    };
    if (child.children) {
      node.children =
        node.type === "code"
          ? [child.children.join("")]
          : mergeStrings(_normalizeTree(child));
    }
    if (child.props) {
      node.props = child.props as Record<string, any>;
      if ("align" in node.props && !node.props.align) {
        delete node.props.align;
      }
      if (node.props.isTask) {
        node.props.checked = node.props.done;
        delete node.props.isTask;
        delete node.props.done;
      }
      if (Object.keys(node.props).length === 0) {
        delete node.props;
      }
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
  8: "html" as Type,
  9: "p",
  10: "table",
  11: "thead",
  12: "tbody",
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
  35: "del",
  36: "latexmath" as Type,
  37: "latexmath_display" as Type,
  38: "wikilink" as Type,
  39: "u" as Type,
};

function mapNodeType(type: number): Type {
  return nodeTypes[type] || type;
}

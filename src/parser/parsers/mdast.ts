import type { RootContent, Root } from "mdast";
import type { Options } from "mdast-util-from-markdown";
import type { ParsedTree, Parser, Node, Type } from "../types";
import { mergeStrings } from "../_utils";

/**
 *
 * Create parser with [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown).
 *
 * **WARNING**: The returned tree structure is unstable.
 *
 * @example
 *
 * ```ts
 * import { initMdAstParser } from "omark/parser";
 * const parser = await initMdAstParser();
 * const { tree } = parser.parse("# Hello, *world*!");
 * ```
 *
 * @group parsing_utils
 */
export async function initMdAstParser(opts: Options = {}): Promise<Parser> {
  const fromMarkdown = await import("mdast-util-from-markdown").then(
    (r) => r.fromMarkdown || r.default || r,
  );

  return {
    parse: (md: string) => {
      const root = fromMarkdown(md, undefined, opts);
      const tree = (_normalizeTree(root)?.[0] as Node).children || [];
      return {
        // _test: root,
        tree,
      };
    },
  };
}

function _normalizeTree(_node: Root | RootContent): ParsedTree {
  const node: Node = {
    type: getType(_node),
  };

  switch (_node.type) {
    case "code": {
      node.children = [_node.value + "\n"];
      if (_node.lang) {
        node.props = {
          lang: _node.lang,
        };
      }
      return [node];
    }
    case "inlineCode": {
      node.children = [_node.value];
      return [node];
    }
    case "text":
    case "html": {
      return [_node.value || ""];
    }
    case "image": {
      node.props = {
        src: _node.url,
        alt: _node.alt || "",
      };
      if (_node.title) {
        node.props.title = _node.title;
      }
      return [node];
    }
  }

  if ("children" in _node) {
    node.children = mergeStrings(
      _node.children.flatMap((c) => _normalizeTree(c)),
    );

    if (_node.type === "listItem") {
      node.children = node.children?.flatMap((c) => {
        if (typeof c !== "string" && c.type === "p") {
          return c.children || [];
        }
        return c;
      });
    }

    if (_node.type === "link") {
      node.props = {
        href: _node.url,
      };
    }
  }

  return [node];
}

const typeMap: Partial<Record<string, Type>> = {
  blockquote: "blockquote",
  strong: "strong",
  table: "table",
  break: "br",
  code: "code",
  inlineCode: "code",
  delete: "del",
  emphasis: "em",
  link: "a",
  listItem: "li",
  paragraph: "p",
  tableRow: "tr",
  tableCell: "td",
  thematicBreak: "hr",
  image: "img",
};

function getType(node: Root | RootContent): Type {
  if (node.type === "list") {
    return node.ordered ? "ol" : "ul";
  }
  if (node.type === "heading") {
    return `h${node.depth}` as Type;
  }
  return typeMap[node.type] || (node.type as Type);
}

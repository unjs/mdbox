export type Type =
  | "blockquote"
  | "strong"
  | "table"
  | "code"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "em"
  | "a"
  | "p"
  | "tr"
  | "th"
  | "td"
  | "ul"
  | "ol"
  | "li"
  | "s"
  | "br"
  | "hr";

export type Node = {
  type: Type;
  children?: (Node | string)[];
  props?: Record<string, string>;
};

export type ParsedTree = (Node | string)[];

export interface Parsed {
  tree: ParsedTree;
}

export interface Parser {
  parse: (markdown: string) => Parsed;
}

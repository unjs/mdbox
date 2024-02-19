export type Type =
  | "blockquote"
  | "img"
  // Format
  | "strong"
  | "code"
  | "del"
  // Headings
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "em"
  | "a"
  | "p"
  // List
  | "ul"
  | "ol"
  | "li"
  // Special
  | "br"
  | "hr"
  // Table
  | "table"
  | "thead"
  | "tbody"
  | "tr"
  | "th"
  | "td";

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

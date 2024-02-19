export type Tag =
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

export type ChildNode = Node | string;

export type Node = {
  tag: Tag;
  children?: ChildNode[];
  attrs?: Record<string, string>;
};

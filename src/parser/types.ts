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

export type Node = {
  tag: Tag;
  children?: (Node | string)[];
  attrs?: Record<string, string>;
};

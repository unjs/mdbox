export type BlockType =
  | (string & {}) // eslint-disable-line @typescript-eslint/ban-types
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "em"
  | "strong"
  | "a"
  | "html_inline"
  | "html_block"
  | "softbreak"
  | "text";

export type Block = {
  type: BlockType;
  children: (Block | string)[];
  attrs?: Record<string, string>;
};

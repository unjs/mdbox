import {
  initMarkdownItParser,
  initMd4wParser,
  initMdAstParser,
} from "../src/parser";

export { fixture } from "./fixture/readme.md";

export const parsers = {
  markdownit: {
    init: initMarkdownItParser,
    results: {},
    options: {},
  },
  mdast: {
    init: initMdAstParser,
    results: {},
    options: {},
  },
  md4w: {
    init: initMd4wParser,
    results: {},
    options: {},
  },
} as const;

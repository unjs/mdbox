import { readFile } from "node:fs/promises";
import {
  initMarkdownItParser,
  initMd4wParser,
  initMdAstParser,
} from "../src/parser";

const _readFixture = (name: string) =>
  readFile(new URL(`fixture/${name}`, import.meta.url), "utf8");

export const fixtures = {
  simple: await _readFixture("simple.md"),
  commonmark: await _readFixture("commonmark.md"),
} as const;

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

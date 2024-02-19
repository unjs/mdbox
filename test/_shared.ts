import { readFile } from "node:fs/promises";
import {
  initMarkdownItParser,
  initMd4wParser,
  initMdAstParser,
} from "../src/parser";

export function readFixture(name: string) {
  return readFile(new URL(`fixtures/${name}`, import.meta.url), "utf8");
}

export const fixtures = {
  simple: await readFixture("simple.md"),
  commonmark: await readFixture("commonmark.md"),
} as const;

export const parsers = {
  markdownit: {
    init: initMarkdownItParser,
    results: {} as Record<string, any>,
    options: {},
  },
  mdast: {
    init: initMdAstParser,
    results: {} as Record<string, any>,
    options: {},
  },
  md4w: {
    init: initMd4wParser,
    results: {} as Record<string, any>,
    options: {},
  },
} as const;

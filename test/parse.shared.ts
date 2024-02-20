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
  commonmarkSpec: {
    fileName: "commonmark.spec.md",
    snapshot: false,
    compare: false,
  },
  commonmark: {
    fileName: "commonmark.md",
    snapshot: true,
    compare: true,
  },
  gfm: {
    fileName: "gfm.md",
    snapshot: true,
    compare: true,
  },
  mdc: {
    fileName: "mdc.md",
    snapshot: true,
    compare: false,
  },
} as const;

export const parsers = {
  markdownit: {
    init: initMarkdownItParser,
    results: {} as Record<string, any>,
    compare: true,
    options: {},
  },
  mdast: {
    init: initMdAstParser,
    results: {} as Record<string, any>,
    // compare: true,
    options: {},
  },
  md4w: {
    init: initMd4wParser,
    results: {} as Record<string, any>,
    compare: true,
    options: {},
  },
} as const;

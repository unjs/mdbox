import { expect, it, describe } from "vitest";
import {
  initMarkdownItParser,
  initMd4wParser,
  initMdAstParser,
} from "../src/parser";
import fixture from "./fixture/readme.md";

const parsers = {
  markdownit: {
    init: initMarkdownItParser,
    result: {},
    options: {},
  },
  mdast: {
    init: initMdAstParser,
    result: {},
    options: {},
  },
  md4w: {
    init: initMd4wParser,
    result: {},
    options: {},
  },
} as const;

describe("omark:parsers", () => {
  for (const [name, { init, options, result }] of Object.entries(parsers)) {
    describe(name, async () => {
      const parser = await init(options);
      it("parse", () => {
        const parsed = parser.parse(fixture);
        Object.assign(result, parsed);
        expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
          `snapshot/${name}.json`,
        );
      });
    });
  }

  for (let i = 0; i < Object.keys(parsers).length; i++) {
    const [name1, { result: result1 }] = Object.entries(parsers)[i];
    for (let j = i + 1; j < Object.keys(parsers).length; j++) {
      const [name2, { result: result2 }] = Object.entries(parsers)[j];
      describe(`${name1} vs ${name2}`, () => {
        it("result", () => {
          expect(result1).toEqual(result2);
        });
      });
    }
  }
});

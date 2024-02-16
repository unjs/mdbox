import { expect, it, describe } from "vitest";
import { parseWithMarkdownit, parseWithMdast } from "../src/parser";
import fixture from "./fixture/readme.md";

describe("omark: parser", () => {
  const results = {
    markdownit: {},
    mdast: {},
  };

  describe("markdownit", () => {
    it("parse", async () => {
      const parsed = await parseWithMarkdownit(fixture());
      results.markdownit = parsed;
      expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
        "snapshot/markdownit.json",
      );
    });
  });

  describe("mdast", () => {
    it("parse", async () => {
      const parsed = await parseWithMdast(fixture());
      results.mdast = parsed;
      expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
        "snapshot/mdast.json",
      );
    });
  });

  describe("compare", () => {
    it("markdownit to be same as mdast", () => {
      expect(results.markdownit).toEqual(results.mdast);
    });
  });
});

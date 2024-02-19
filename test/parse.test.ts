import { expect, it, describe } from "vitest";
import {
  parseWithMarkdownit,
  parseWithMdast,
  parseWithMd4w,
} from "../src/parser";
import fixture from "./fixture/readme.md";

describe("omark: parser", () => {
  const results = {
    markdownit: {},
    mdast: {},
    md4w: {},
  };

  describe("markdownit", () => {
    it("parse", async () => {
      const parsed = await parseWithMarkdownit(fixture);
      results.markdownit = parsed;
      expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
        "snapshot/markdownit.json",
      );
    });
  });

  describe("mdast", () => {
    it("parse", async () => {
      const parsed = await parseWithMdast(fixture);
      results.mdast = parsed;
      expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
        "snapshot/mdast.json",
      );
    });
  });

  describe("md4w", () => {
    it("parse", async () => {
      const parsed = await parseWithMd4w(fixture);
      results.md4w = parsed;
      expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
        "snapshot/md4w.json",
      );
    });
  });

  describe("compare", () => {
    it("markdownit to be same as mdast", () => {
      expect(results.markdownit).toEqual(results.mdast);
    });

    it("markdownit to be same as md4w", () => {
      expect(results.markdownit).toEqual(results.md4w);
    });
  });
});

import { expect, it, describe } from "vitest";
import { parseWithMarkdownit } from "../src/parser";
import fixture from "./fixture/readme.md";

describe("omark: parser", () => {
  it("parse with markdown-it", async () => {
    const parsed = await parseWithMarkdownit(fixture());
    expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
      "snapshot/markdownit.json",
    );
  });
});

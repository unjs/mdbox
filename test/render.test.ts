import { expect, it, describe } from "vitest";
import MarkdownIt from "markdown-it";
import { md } from "../src";

const renderTests = {
  bold: [["Hello, World!", "**Hello, World!**"]],
  blockquote: [["Hello, World!", "> Hello, World!"]],
  boldAndItalic: [["Hello, World!", "***Hello, World!***"]],
  codeBlock: [
    [
      'console.log("Hello, World!");',
      '```\nconsole.log("Hello, World!");\n```',
    ],
    [
      'console.log("Hello, World!");',
      "js",
      { ext: '[name="index.js"]' },
      '```js [name="index.js"]\nconsole.log("Hello, World!");\n```',
    ],
    [
      'console.log("Hello, World!");',
      "js",
      '```js\nconsole.log("Hello, World!");\n```',
    ],
  ],
  strikethrough: [["Hello, World!", "~~Hello, World!~~"]],
  italic: [["Hello, World!", "_Hello, World!_"]],
  hr: [["---"], [5, "-----"]],
  image: [
    // Basic
    [
      "https://cataas.com/cat",
      "Cute Cat",
      "![Cute Cat](https://cataas.com/cat)",
    ],
    // With title
    [
      "https://cataas.com/cat",
      "Cute Cat",
      { title: "title" },
      '![Cute Cat](https://cataas.com/cat "title")',
    ],
    // No text
    ["https://cataas.com/cat", "![](https://cataas.com/cat)"],
    // No url
    ["", "Cute Cat", "![Cute Cat](#)"],
    ["", "", "![](#)"],
  ],
  heading: [
    ["Hello, World!", "\n# Hello, World!\n"],
    ["Hello, World!", 1, "\n# Hello, World!\n"],
    ["Hello, World!", 3, "\n### Hello, World!\n"],
  ],
  link: [
    // Basic
    [
      "https://www.example.com",
      "Example",
      "[Example](https://www.example.com)",
    ],
    // External
    [
      "https://www.example.com",
      "Example",
      { external: true, title: "title" },
      '<a href="https://www.example.com" title="title" target="_blank">Example</a>',
    ],
    // With title
    [
      "https://www.example.com",
      "Example",
      { title: "title" },
      '[Example](https://www.example.com "title")',
    ],
    // No text
    ["http://example.com", "[http://example.com](http://example.com)"],
    // No link
    ["", "Title", "[Title](#)"],
    ["", "", "[](#)"],
    // Relative path
    ["./src/markdown.md", "Markdown", "[Markdown](./src/markdown.md)"],
    // URL
    [
      new URL("https://www.example.com/"),
      "Example",
      "[Example](https://www.example.com/)",
    ],
  ],
  list: [
    [["Item 1", "Item 2"], "- Item 1\n- Item 2"],
    [["Item 1", "Item 2"], { ordered: true }, "1. Item 1\n2. Item 2"],
    [["Item 1", "Item 2"], { char: "- [ ]" }, "- [ ] Item 1\n- [ ] Item 2"],
  ],
} as Record<keyof typeof md, any[][]>;

describe("mdbox", () => {
  for (const [fn, tests] of Object.entries(renderTests)) {
    describe(fn, () => {
      for (const t of tests) {
        const output = t.pop();
        it(`${fn}(${t.map((i) => JSON.stringify(i)).join(", ")})`, () => {
          expect(md[fn](...t)).toBe(output);
        });
      }
    });
  }

  it("table", () => {
    expect(
      md.table({
        columns: ["Breed", "Origin", "Size", "Temperament"],
        rows: [
          ["Abyssinian", "Egypt", "Medium", "Active"],
          ["Aegean", "Greece", "Medium", "Active"],
          ["American Bobtail", "United States", "Medium", "Active"],
          ["Applehead Siamese", "Thailand", "Medium", "Active"],
        ],
      }),
    ).toMatchInlineSnapshot(`
      "| Breed | Origin | Size | Temperament |
      | --- | --- | --- | --- |
      | Abyssinian | Egypt | Medium | Active |
      | Aegean | Greece | Medium | Active |
      | American Bobtail | United States | Medium | Active |
      | Applehead Siamese | Thailand | Medium | Active |"
    `);
  });
});

/** Read a rendered table back, so assertions are about cells and not text. */
function parseTableCells(markdown: string): string[][] {
  const tokens = new MarkdownIt().parse(markdown, {});
  const rows: string[][] = [];
  let row: string[] | undefined;
  for (const token of tokens) {
    if (token.type === "tr_open") {
      row = [];
    } else if (token.type === "tr_close" && row) {
      rows.push(row);
      row = undefined;
    } else if (token.type === "inline" && row) {
      row.push(token.content);
    }
  }
  return rows;
}

describe("table cells", () => {
  it("keeps a pipe inside the cell that contains it", () => {
    const rendered = md.table({
      columns: ["Pattern", "Matches"],
      rows: [["a|b", "a or b"]],
    });

    expect(rendered).toMatchInlineSnapshot(`
      "| Pattern | Matches |
      | --- | --- |
      | a\\|b | a or b |"
    `);
    expect(parseTableCells(rendered)).toEqual([
      ["Pattern", "Matches"],
      ["a|b", "a or b"],
    ]);
  });

  it("escapes a pipe in a column name", () => {
    const rendered = md.table({ columns: ["a|b", "c"], rows: [["1", "2"]] });

    expect(parseTableCells(rendered)).toEqual([
      ["a|b", "c"],
      ["1", "2"],
    ]);
  });

  it("does not double escape a pipe that is already escaped", () => {
    const rendered = md.table({
      columns: ["Pattern"],
      rows: [[String.raw`a\|b`]],
    });

    expect(rendered).toContain(String.raw`| a\|b |`);
    expect(parseTableCells(rendered)).toEqual([["Pattern"], ["a|b"]]);
  });

  it("keeps a multi line cell on its own row", () => {
    const rendered = md.table({
      columns: ["Name", "Notes"],
      rows: [
        ["first", "line one\nline two"],
        ["second", "plain"],
      ],
    });

    // A row ends at the first newline, so an unescaped one would drop
    // everything after it — including the rows that follow.
    expect(rendered.split("\n")).toHaveLength(4);
    expect(parseTableCells(rendered)).toEqual([
      ["Name", "Notes"],
      ["first", "line one<br>line two"],
      ["second", "plain"],
    ]);
  });

  it("renders a header only table without a trailing newline", () => {
    expect(md.table({ columns: ["a", "b"], rows: [] })).toMatchInlineSnapshot(`
      "| a | b |
      | --- | --- |"
    `);
  });
});

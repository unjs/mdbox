import { expect, it, describe } from "vitest";
import { md } from "../src";

const renderTests = {
  bold: [["Hello, World!", "**Hello, World!**"]],
  blockquote: [["Hello, World!", "> Hello, World!"]],
  boldAndItalic: [["Hello, World!", "***Hello, World!***"]],
  codeBlock: [
    [
      'console.log("Hello, World!");',
      "js",
      '```js\nconsole.log("Hello, World!");\n```',
    ],
  ],
  strikethrough: [["Hello, World!", "~~Hello, World!~~"]],
  italic: [["Hello, World!", "_Hello, World!_"]],
  hr: [["---"]],
  image: [
    [
      "https://cataas.com/cat",
      "Cute Cat",
      "![Cute Cat](https://cataas.com/cat)",
    ],
  ],
  heading: [
    ["Hello, World!", "\n# Hello, World!\n"],
    ["Hello, World!", 1, "\n# Hello, World!\n"],
    ["Hello, World!", 3, "\n### Hello, World!\n"],
  ],
  link: [
    ["https://www.google.com", "Google", "[Google](https://www.google.com)"],
    [
      "https://www.google.com",
      "Google",
      { external: true, title: "Google" },
      '<a href="https://www.google.com" title="Google" target="_blank">Google</a>',
    ],
  ],
  list: [
    [["Item 1", "Item 2"], "- Item 1\n- Item 2"],
    [["Item 1", "Item 2"], { ordered: true }, "1. Item 1\n2. Item 2"],
    [["Item 1", "Item 2"], { char: "- [ ]" }, "- [ ] Item 1\n- [ ] Item 2"],
  ],
} as Record<keyof typeof md, any[][]>;

describe("omark", () => {
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

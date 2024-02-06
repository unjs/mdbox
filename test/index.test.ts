import { expect, it, describe } from "vitest";
import { md } from "../src";

const tests = [
  {
    fn: "bold",
    cases: [
      {
        name: "should be bold",
        input: ["Hello, World!"],
        output: "**Hello, World!**",
      },
    ],
  },
  {
    fn: "blockquote",
    cases: [
      {
        name: "should be blockquote",
        input: ["Hello, World!"],
        output: "> Hello, World!",
      },
    ],
  },
  {
    fn: "boldAndItalic",
    cases: [
      {
        name: "should be boldAndItalic",
        input: ["Hello, World!"],
        output: "***Hello, World!***",
      },
    ],
  },
  {
    fn: "codeBlock",
    cases: [
      {
        name: "should be codeBlock",
        input: ['console.log("Hello, World!");', "js"],
        output: '```js\nconsole.log("Hello, World!");\n```',
      },
    ],
  },
  {
    fn: "strikethrough",
    cases: [
      {
        name: "should be strikethrough",
        input: ["Hello, World!"],
        output: "~~Hello, World!~~",
      },
    ],
  },
  {
    fn: "italic",
    cases: [
      {
        name: "should be italic",
        input: ["Hello, World!"],
        output: "_Hello, World!_",
      },
    ],
  },
  {
    fn: "hr",
    cases: [
      {
        name: "should be hr",
        input: [],
        output: "---",
      },
    ],
  },
  {
    fn: "image",
    cases: [
      {
        name: "should be image",
        input: ["https://cataas.com/cat", "Cute Cat"],
        output: "![Cute Cat](https://cataas.com/cat)",
      },
    ],
  },
  {
    fn: "heading",
    cases: [
      {
        name: "should be h1",
        input: ["Hello, World!", 1],
        output: "\n# Hello, World!\n",
      },
      {
        name: "should be h2",
        input: ["Hello, World!", 2],
        output: "\n## Hello, World!\n",
      },
      {
        name: "should be h3",
        input: ["Hello, World!", 3],
        output: "\n### Hello, World!\n",
      },
      {
        name: "should be h4",
        input: ["Hello, World!", 4],
        output: "\n#### Hello, World!\n",
      },
      {
        name: "should be h5",
        input: ["Hello, World!", 5],
        output: "\n##### Hello, World!\n",
      },
      {
        name: "should be h6",
        input: ["Hello, World!", 6],
        output: "\n###### Hello, World!\n",
      },
    ],
  },
  {
    fn: "link",
    cases: [
      {
        name: "should be a markdown link without options",
        input: ["https://www.google.com", "Google"],
        output: "[Google](https://www.google.com)",
      },
      {
        name: "should be an anchor link with options",
        input: [
          "https://www.google.com",
          "Google",
          {
            external: true,
            title: "Google",
          },
        ],
        output:
          '<a href="https://www.google.com" title="Google" target="_blank">Google</a>',
      },
    ],
  },
  {
    fn: "list",
    cases: [
      {
        name: "should be unordered",
        input: [["Item 1", "Item 2"]],
        output: "- Item 1\n- Item 2",
      },
      {
        name: "should be ordered",
        input: [["Item 1", "Item 2"], { ordered: true }],
        output: "1. Item 1\n2. Item 2",
      },
      {
        name: "should be unordered checklist",
        input: [["Item 1", "Item 2"], { char: "- [ ]" }],
        output: "- [ ] Item 1\n- [ ] Item 2",
      },
    ],
  },
];

describe("omark", () => {
  for (const test of tests) {
    describe(`${test.fn}`, () => {
      for (const testCase of test.cases) {
        it(`${testCase.name}`, () => {
          expect(md[test.fn](...testCase.input)).toBe(testCase.output);
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

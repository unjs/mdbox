import { expect, it, describe } from "vitest";
import {
  bold,
  blockquote,
  boldAndItalic,
  codeBlock,
  heading,
  hr,
  image,
  italic,
  link,
  list,
  strikethrough,
  table
} from "../src";

describe("omark", () => {
  it("bold", () => {
    expect(bold("Hello, World!")).toBe("**Hello, World!**");
  });

  it("blockquote", () => {
    expect(blockquote("Hello, World!")).toBe("> Hello, World!");
  });

  it("boldAndItalic", () => {
    expect(boldAndItalic("Hello, World!")).toBe("***Hello, World!***");
  });

  it("coldBlock", () => {
    expect(codeBlock('console.log("Hello, World!");', "js")).toBe(
      '```js\nconsole.log("Hello, World!");\n```',
    );
  });

  it("heading", () => {
    expect(heading("Hello, World!", 1)).toBe("\n# Hello, World!\n");
    expect(heading("Hello, World!", 2)).toBe("\n## Hello, World!\n");
    expect(heading("Hello, World!", 3)).toBe("\n### Hello, World!\n");
    expect(heading("Hello, World!", 4)).toBe("\n#### Hello, World!\n");
    expect(heading("Hello, World!", 5)).toBe("\n##### Hello, World!\n");
    expect(heading("Hello, World!", 6)).toBe("\n###### Hello, World!\n");
  });

  it("hr", () => {
    expect(hr()).toBe("---");
  });

  it("image", () => {
    expect(image("https://cataas.com/cat", "Cute Cat")).toBe(
      "![Cute Cat](https://cataas.com/cat)",
    );
  });

  it("italic", () => {
    expect(italic("Hello, World!")).toBe("_Hello, World!_");
  });

  it("link", () => {
    expect(link("Google", "https://www.google.com")).toBe("[https://www.google.com](Google)");
    expect(link("https://www.google.com", "Google", { external: true, title: "Google" })).toBe(
      '<a href="https://www.google.com" title="Google" target="_blank">Google</a>',
    );
  });

  it("list", () => {
    expect(list(['Item 1', 'Item 2', 'Item 3'])).toBe("- Item 1\n- Item 2\n- Item 3")
  })

  it("strikethrough", () => {
    expect(strikethrough("Hello, World!")).toBe("~~Hello, World!~~")
  })

  it("table", () => {
    expect(table({
      columns: ["Breed", "Origin", "Size", "Temperament"],
      rows: [
        ["Abyssinian", "Egypt", "Medium", "Active"],
        ["Aegean", "Greece", "Medium", "Active"],
        ["American Bobtail", "United States", "Medium", "Active"],
        ["Applehead Siamese", "Thailand", "Medium", "Active"],
       ],
     })).toBe(
      `| Breed | Origin | Size | Temperament |
| --- | --- | --- | --- |
| Abyssinian | Egypt | Medium | Active |
| Aegean | Greece | Medium | Active |
| American Bobtail | United States | Medium | Active |
| Applehead Siamese | Thailand | Medium | Active |`
     )
  })
});

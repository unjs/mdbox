import { expect, it, describe } from "vitest";
import { parseWithMarkdownit } from "../src/parser";

describe("omark: parser", () => {
  const fixture = /** md */ `
# Jobs

Stay _foolish_, stay **hungry**!

[Apple](https://apple.com)
<a href="https://example.com">Example</a>

<div>
  <p>Paragraph</p>
</div>
  `;

  it("parse with markdown-it", async () => {
    const parsed = await parseWithMarkdownit(fixture);
    expect(parsed).toMatchInlineSnapshot(`
      [
        {
          "attrs": undefined,
          "children": [
            "Jobs",
          ],
          "type": "h1",
        },
        {
          "attrs": undefined,
          "children": [
            "Stay ",
            {
              "attrs": undefined,
              "children": [
                "foolish",
              ],
              "type": "em",
            },
            ", stay ",
            {
              "attrs": undefined,
              "children": [
                "hungry",
              ],
              "type": "strong",
            },
            "!",
          ],
          "type": "p",
        },
        {
          "attrs": undefined,
          "children": [
            {
              "attrs": {
                "href": "https://apple.com",
              },
              "children": [
                "Apple",
              ],
              "type": "a",
            },
            {
              "children": [
                "",
              ],
              "type": "softbreak",
            },
            {
              "children": [
                "</a>",
              ],
              "type": "html_inline",
            },
          ],
          "type": "p",
        },
        {
          "children": [
            "<div>
        <p>Paragraph</p>
      </div>
      ",
          ],
          "type": "html_block",
        },
      ]
    `);
  });
});

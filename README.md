# ⬇ mdbox

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

Just simple markdown utils!

> [!IMPORTANT]
> This project is under development.

## 💡 Why?

> Markdown is intended to be as easy-to-read and easy-to-write as is. Readability is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text [^1]. Any sequence of characters is a valid Markdown document [^2].

While Markdown is designed to be simple, I often find myself in situations where there is simply no tool to allow programmatically working with Markdown syntax without dealing with complex and strict AST objects and choosing between dozens of available tools and extensions. Often, not even worth pursuing ideas around Markdown.

The idea is to make good-enough tools to read and write Markdown programmatically, as easy as Markdown itself is, without dealing with an AST.

## Usage

Install package:

```sh
# npm
npm install mdbox

# yarn
yarn add mdbox

# pnpm
pnpm install mdbox

# bun
bun install mdbox
```

Import:

```js
// ESM
import { md } from "mdbox";

// CommonJS
const { md } = require("mdbox");
```

<!-- automd:jsdocs src="./src/index" group="render_utils" -->

## Render Utils

### `blockquote(text)`

Render a markdown blockquote text with > in front of a paragraph

**Example:**

```js
md.blockquote("Hello, World!");
// => "> Hello, World!"
```

### `bold(text)`

Render a markdown bold text.

**Example:**

```js
md.bold("Hello, World!");
// => "**Hello, World!**"
```

### `boldAndItalic(text)`

Render a markdown bold and italic text.

**Example:**

```js
md.boldAndItalic("Hello, World!");
// => "***Hello, World!***"
```

### `codeBlock(code, lang?, opts?: { ext? })`

Format a string as a code block.

**Example:**

```js
md.codeBlock('console.log("Hello, World!");', "js");
// => "```js\nconsole.log("Hello, World!");\n```"
```

### `heading(text, level)`

Render a markdown heading.

**Example:**

```js
md.heading("Hello, World!", 1);
// => "\n# Hello, World!\n"
```

### `hr(length)`

Render a markdown horizontal rule.

**Example:**

```js
md.hr();
// => "---"
```

### `image(url, text?, opts?: { title? })`

Render a markdown image.

**Example:**

```js
md.image("https://cataas.com/cat", "Cute Cat");
// => "![Cute Cat](https://cataas.com/cat)"
```

### `italic(text)`

Render a markdown italic text.

**Example:**

```js
md.italic("Hello, World!");
// => "_Hello, World!_"
```

### `link(url, text?, opts?: { title?, external? })`

Render a markdown link.

**Example:**

```js
md.link("https://www.google.com", "Google");
// => "[Google](https://www.google.com)"
```
```js
md.link("https://www.google.com", "Google", { external: true });
// => "<a href="https://www.google.com" title="Google" target="_blank">Google</a>"
```

### `list(items, opts: { ordered?, char? })`

Render a markdown ordered or unordered list.

**Example:**

```js
md.list(["Item 1", "Item 2", "Item 3"]);
// => "- Item 1\n- Item 2\n- Item 3"
```
```js
md.list(["Item 1", "Item 2", "Item 3"], { ordered: true });
// => "1. Item 1\n2. Item 2\n3. Item 3"
```

### `strikethrough(text)`

Render a markdown strikethrough text.

**Example:**

```js
md.strikethrough("Hello, World!");
// => "~~Hello, World!~~"
```

### `table(table: { rows[][], columns[] })`

Render a markdown table.

**Example:**

```js
md.table({
 columns: ["Breed", "Origin", "Size", "Temperament"],
 rows: [
   ["Abyssinian", "Egypt", "Medium", "Active"],
   ["Aegean", "Greece", "Medium", "Active"],
   ["American Bobtail", "United States", "Medium", "Active"],
   ["Applehead Siamese", "Thailand", "Medium", "Active"],
  ],
});
```


<!-- /automd -->

<!-- automd:jsdocs src="./src/parser/index" group="parsing_utils" -->

## Parsing Utils

### `initMarkdownItParser(options)`

Create parser with [markdown-it](https://github.com/markdown-it/markdown-it).

**WARNING**: The returned tree structure is unstable.

**Example:**

```ts
import { initMarkdownItParser } from "mdbox/parser";
const parser = await initMarkdownItParser();
const { tree } = parser.parse("# Hello, *world*!");
```

### `initMd4wParser(opts)`

Create parser with [md4w](https://github.com/ije/md4w).

**WARNING**: The returned tree structure is unstable.

**Example:**

```ts
import { initMd4wParser } from "mdbox/parser";
const parser = await initMd4wParser();
const { tree } = parser.parse("# Hello, *world*!");
```

### `initMdAstParser(opts)`

Create parser with [mdast-util-from-markdown](https://github.com/syntax-tree/mdast-util-from-markdown).

**WARNING**: The returned tree structure is unstable.

**Example:**

```ts
import { initMdAstParser } from "mdbox/parser";
const parser = await initMdAstParser();
const { tree } = parser.parse("# Hello, *world*!");
```


<!-- /automd -->

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/mdbox?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/mdbox
[npm-downloads-src]: https://img.shields.io/npm/dm/mdbox?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/mdbox

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/mdbox/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/mdbox

[bundle-src]: https://img.shields.io/bundlephobia/minzip/mdbox?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=mdbox -->

[^1]: https://daringfireball.net/projects/markdown/
[^2]: https://spec.commonmark.org/0.31.2/#characters-and-lines

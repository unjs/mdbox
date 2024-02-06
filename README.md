# ⬇️ omark

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

<!-- [![bundle][bundle-src]][bundle-href] -->
<!-- [![Codecov][codecov-src]][codecov-href] -->

Just simple markdown utils!

> [!NOTE]
> This project is under development and i am colleting more utils across my projects to here.

## Usage

Install package:

```sh
# npm
npm install omark

# yarn
yarn add omark

# pnpm
pnpm install omark

# bun
bun install omark
```

Import:

```js
// ESM
import { md } from "omark";

// CommonJS
const { md } = require("omark");
```

## Utils

<!-- AUTOMD_START generator="jsdocs" -->

### Render

#### `blockquote(text)`

Render a markdown blockquote text with > in front of a paragraph

**Example:**

```js
md.blockquote("Hello, World!");
// => "> Hello, World!"
```

#### `bold(text)`

Render a markdown bold text.

**Example:**

```js
md.bold("Hello, World!");
// => "**Hello, World!**"
```

#### `boldAndItalic(text)`

Render a markdown bold and italic text.

**Example:**

```js
md.bold("Hello, World!");
// => "***Hello, World!***"
```

#### `codeBlock(code, lang, opts)`

Format a string as a code block.

**Example:**

````js
md.codeBlock('console.log("Hello, World!");', "js");
// => "```js\nconsole.log("Hello, World!");\n```"
````

#### `heading(text, level)`

Render a markdown heading.

**Example:**

```js
md.heading(1, "Hello, World!");
// => "\n# Hello, World!\n"
```

#### `hr(length)`

Render a markdown horizontal rule.

**Example:**

```js
md.hr();
// => "---"
```

#### `image(url, text, opts)`

Render a markdown image.

**Example:**

```js
md.image("https://cataas.com/cat", "Cute Cat");
// => "![Cute Cat](https://cataas.com/cat)"
```

#### `italic(text)`

Render a markdown italic text.

**Example:**

```js
md.bold("Hello, World!");
// => "_Hello, World!_"
```

#### `link(url, text, opts)`

Render a markdown link.

**Example:**

```js
md.link("Google", "https://www.google.com");
// => "[Google](https://www.google.com)"
```

```js
md.link("https://www.google.com", "Google", { external: true });
// => "<a href="https://www.google.com" title="Google" target="_blank">Google</a>"
```

#### `list(items, opts)`

Render a markdown ordered or unordered list.

**Example:**

```js
md.list(["Item 1", "Item 2", "Item 3"]);
// => "- Item 1\n- Item 2\n- Item 3"
```

#### `strikethrough(text)`

Render a markdown strikethrough text.

**Example:**

```js
md.strikethrough("Hello, World!");
// => "~~Hello, World!~~"
```

#### `table(table)`

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

<!-- AUTOMD_END -->

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

[npm-version-src]: https://img.shields.io/npm/v/omark?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/omark
[npm-downloads-src]: https://img.shields.io/npm/dm/omark?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/omark

<!-- [codecov-src]: https://img.shields.io/codecov/c/gh/unjs/omark/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/omark

[bundle-src]: https://img.shields.io/bundlephobia/minzip/omark?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=omark -->

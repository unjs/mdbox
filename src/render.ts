/**
 * Render a markdown heading.
 *
 * @example
 *
 * ```js
 * md.heading(1, 'Hello, World!');
 * // => "\n# Hello, World!\n"
 * ```
 * @param text Heading title
 * @param level Heading level
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function heading(text: string, level: number): string {
  return `\n${"#".repeat(level || 1)} ${text}\n`;
}

/**
 *
 * Render a markdown link.
 *
 * @example
 *
 * ```js
 *  md.link('https://www.google.com', 'Google');
 *  // => "[Google](https://www.google.com)"
 * ```
 *
 * ```js
 * md.link('https://www.google.com', 'Google', { external: true });
 * // => "<a href="https://www.google.com" title="Google" target="_blank">Google</a>"
 * ```
 *
 * @param url Link URL - will be # if not provided or empty
 * @param title Link title - will be same as `url` if not provided or empty
 * @param opts Additional options for link
 * @param opts.title Link title
 * @param opts.external If true, render link as HTML anchor tag
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function link(
  url: string,
  text?: string,
  opts?: { title?: string; external?: boolean },
): string {
  if (opts?.external) {
    return `<a href="${url}" title="${opts.title}" target="_blank">${text}</a>`;
  }
  return `[${text || url}](${url || "#"}${opts?.title ? ` "${opts.title}"` : ""})`;
}

/**
 * Render a markdown image.
 *
 * @example
 *
 * ```js
 * md.image('https://cataas.com/cat', 'Cute Cat');
 * // => "![Cute Cat](https://cataas.com/cat)"
 * ```
 *
 * @param url Image URL
 * @param text Image text
 * @param opts Additional options for image
 * @param opts.title Image title
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function image(
  url: string,
  text?: string,
  opts?: { title?: string },
): string {
  return `![${text || ""}](${url || "#"}${opts?.title ? ` "${opts.title}"` : ""})`;
}

/**
 *
 * Format a string as a code block.
 *
 * @example
 *
 * ```js
 * md.codeBlock('console.log("Hello, World!");', 'js');
 * // => "```js\nconsole.log("Hello, World!");\n```"
 * ```
 *
 * @param code Text to be formattted as code block
 * @param lang Language identifier
 * @param opts Additional options for code block
 * @param opts.ext File extension
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function codeBlock(
  code: string,
  lang?: string,
  opts?: { ext?: string },
): string {
  return `\`\`\`${lang || ""}${opts?.ext ? ` ${opts.ext}` : ""}\n${code}\n\`\`\``;
}

/**
 * Render a markdown table.
 *
 * @example
 *
 * ```js
 * md.table({
 *  columns: ["Breed", "Origin", "Size", "Temperament"],
 *  rows: [
 *    ["Abyssinian", "Egypt", "Medium", "Active"],
 *    ["Aegean", "Greece", "Medium", "Active"],
 *    ["American Bobtail", "United States", "Medium", "Active"],
 *    ["Applehead Siamese", "Thailand", "Medium", "Active"],
 *   ],
 * });
 * ```
 *
 * @param table Table object
 * @param table.rows Table rows
 * @param table.columns Table columns
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function table(table: { rows: string[][]; columns: string[] }): string {
  const header = `| ${table.columns.join(" | ")} |`;
  const separator = `| ${table.columns.map(() => "---").join(" | ")} |`;
  const body = table.rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
  return `${header}\n${separator}\n${body}`;
}

/**
 * Render a markdown bold text.
 *
 * @example
 *
 * ```js
 * md.bold('Hello, World!');
 * // => "**Hello, World!**"
 * ```
 *
 * @param text Text to be formatted as bold
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function bold(text: string): string {
  return `**${text}**`;
}

/**
 * Render a markdown italic text.
 *
 * @example
 *
 * ```js
 * md.bold('Hello, World!');
 * // => "_Hello, World!_"
 * ```
 *
 * @param text Text to be formatted as bold
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function italic(text: string): string {
  return `_${text}_`;
}

/**
 * Render a markdown bold and italic text.
 *
 * @example
 *
 * ```js
 * md.bold('Hello, World!');
 * // => "***Hello, World!***"
 * ```
 *
 * @param text Text to be formatted as bold
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function boldAndItalic(text: string): string {
  return `***${text}***`;
}

/**
 * Render a markdown blockquote text with > in front of a paragraph
 *
 * @example
 *
 * ```js
 * md.blockquote('Hello, World!');
 * // => "> Hello, World!"
 * ```
 *
 * @param text Text to be formatted as blockquote
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function blockquote(text: string): string {
  const lines = text.split("\n");
  const quotedLines = lines.map((line) => `> ${line}`);
  return quotedLines.join("\n");
}

/**
 * Render a markdown strikethrough text.
 *
 * @example
 *
 * ```js
 * md.strikethrough('Hello, World!');
 * // => "~~Hello, World!~~"
 * ```
 *
 * @param text Text to be formatted as strikethrough
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function strikethrough(text: string): string {
  return `~~${text}~~`;
}

/**
 * Render a markdown horizontal rule.
 *
 * @example
 *
 * ```js
 * md.hr();
 * // => "---"
 * ```
 *
 * @param length Length of the horizontal rule
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function hr(length: number): string {
  return "-".repeat(length || 3);
}

/**
 * Render a markdown ordered or unordered list.
 *
 * @example
 *
 * ```js
 * md.list(['Item 1', 'Item 2', 'Item 3']);
 * // => "- Item 1\n- Item 2\n- Item 3"
 * ```
 *
 * ```js
 * md.list(["Item 1", "Item 2", "Item 3"], { ordered: true });
 * // => "1. Item 1\n2. Item 2\n3. Item 3")
 * ```
 *
 * @param items List of items
 * @param opts Additional options for list
 * @param opts.ordered If true, render an ordered list
 * @param opts.char Custom character for list
 * @returns Rendered markdown string
 *
 * @group render_utils
 */
export function list(
  items: string[],
  opts: { ordered?: boolean; char?: string } = {},
): string {
  return items
    .map(
      (item, index) =>
        `${opts.ordered ? `${index + 1}.` : opts.char || "-"} ${item}`,
    )
    .join("\n");
}

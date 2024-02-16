export default () => /* md */ `
initial paragraph

# Title

> blockquote

\`\`\`js
code block
\`\`\`

\`inline code\`

_italic_
**bold**
**strikethrough**
~~strikethrough~~
[link](https://example.com)



<span>html inline</span>

<div><span>html block</span></div>

![img title](img.jpg)

1. first item
2. second item
   - nested item

Column 1 | Column 2
-------- | --------
Cell 1   | Cell 2
Cell 3   | Cell 4

___

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

foobar

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    \`{ my code }\`

    Add as many paragraphs as you like.
`;

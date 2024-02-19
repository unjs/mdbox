const fixture = /* md */ `
initial paragraph

# Title

> blockquote

\`\`\`js
import { foo } from "bar";

console.log(foo());
\`\`\`

\`inline code\`

**bold**
_emphasis_
[link](https://example.com)



1. first \`item\`
2. second item
   - nested item

-----

foobar
`;

export default fixture;

/**
Disabled:


<span>html inline</span>

<div><span>html block</span></div>
 */

import { expect, it, describe } from "vitest";

import fixture from "./fixture/readme.md";

// Using github behavior as baseline reference
describe.skip("github", () => {
  it("rendered html", async () => {
    const githubRendered = await fetch("https://api.github.com/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: fixture,
        context: "unjs/omark",
      }),
    }).then((r) => r.text());
    expect(githubRendered).toMatchFileSnapshot("snapshot/gh.html");
  });
});

import { expect, it, describe } from "vitest";
import { fixtures } from "./_shared";

// Using github behavior as baseline reference
describe.skip("github", () => {
  it("rendered html", async () => {
    const githubRendered = await fetch("https://api.github.com/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: fixtures.simple,
        context: "unjs/omark",
      }),
    }).then((r) => r.text());
    expect(githubRendered).toMatchFileSnapshot("snapshot/gh.html");
  });
});

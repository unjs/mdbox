import { readFile } from "node:fs/promises";
import { expect, it, describe } from "vitest";
import { hash } from "ohash";
import { fixtures } from "./_shared";

// Using github behavior as baseline reference
describe("github", () => {
  it("rendered html", async () => {
    // Use snapshot to store cache!
    let fixture = await readFile(
      new URL("snapshots/simple.gh.html", import.meta.url),
      "utf8",
    );
    const snapshotHash = fixture.match(/^<!-- hash:(.+) -->/)?.[1];
    const fixtureHash = hash(fixtures.simple);
    if (snapshotHash !== fixtureHash) {
      console.log("fetching...");
      fixture =
        `<!-- hash:${fixtureHash} -->` +
        (await fetch("https://api.github.com/markdown", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: fixtures.simple,
            context: "unjs/omark",
          }),
        }).then((r) => r.text()));
    }
    expect(fixture).toMatchFileSnapshot("snapshots/simple.gh.html");
  });
});

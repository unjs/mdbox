import { expect, it, describe } from "vitest";
import { hash } from "ohash";
import { fixtures, readFixture } from "./parse.shared";

// Using github behavior as baseline reference
describe("github", () => {
  for (const name of ["commonmark"] as const) {
    it(name, async () => {
      // Use snapshot to store cache!
      let snapshot = await readFixture(`snapshots/${name}/github.html`).catch(
        () => "",
      );
      const snapshotHash = snapshot.match(/^<!-- hash:(.+) -->/)?.[1];

      const fixture = await readFixture(fixtures[name].fileName);
      const fixtureHash = hash(fixture);

      if (snapshotHash !== fixtureHash) {
        snapshot =
          `<!-- hash:${fixtureHash} -->` +
          (await fetch("https://api.github.com/markdown", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: fixture,
              context: "org/repo",
            }),
          }).then((r) => r.text()));
      }

      expect(snapshot).toMatchFileSnapshot(
        `fixtures/snapshots/${name}/github.html`,
      );
    });
  }
});

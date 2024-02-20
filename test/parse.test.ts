import { expect, it, describe } from "vitest";
import { hash } from "ohash";
import { parsers, fixtures, readFixture } from "./parse.shared";

describe("omark:parsers", () => {
  for (const [parserName, { init, options, results }] of Object.entries(
    parsers,
  )) {
    describe(parserName, async () => {
      const parser = await init(options);
      for (const fixureName of Object.keys(fixtures)) {
        it(fixureName, async () => {
          const md = await readFixture(fixtures[fixureName].fileName);
          const parsed = parser.parse(md);
          if ("_test" in parsed) {
            expect(
              JSON.stringify(parsed._test, undefined, 2),
            ).toMatchFileSnapshot(
              `fixtures/.tmp/${fixureName}.${parserName}.json`,
            );
            delete parsed._test;
          }
          results[fixureName] = parsed;
          if (fixureName !== "commonmarkSpec") {
            expect(
              JSON.stringify(parsed.tree, undefined, 2),
            ).toMatchFileSnapshot(
              `fixtures/snapshots/${fixureName}/${parserName}.json`,
            );
          }
        });
      }
    });
  }

  describe("compare results", () => {
    for (let i = 0; i < Object.keys(parsers).length; i++) {
      const [name1, opts1] = Object.entries(parsers)[i];
      for (let j = i + 1; j < Object.keys(parsers).length; j++) {
        const [name2, opts2] = Object.entries(parsers)[j];
        if (opts1.compare !== true || opts2.compare !== true) {
          continue;
        }
        describe(`${name1} vs ${name2}`, () => {
          for (const fixureName of Object.keys(fixtures)) {
            if (fixtures[fixureName].compare !== true) {
              continue;
            }
            it(fixureName, () => {
              expect(opts1.results[fixureName]).toEqual(
                opts2.results[fixureName],
              );
            });
          }
        });
      }
    }
  });

  // Using github behavior as baseline reference
  describe("github", () => {
    for (const name of ["commonmark", "gfm"] as const) {
      it(name, async () => {
        // Use snapshot to store cache!
        let snapshot = await readFixture(`snapshots/${name}/github.html`).catch(
          () => "",
        );
        const snapshotHash = snapshot.match(/^<!-- hash:(.+) -->/)?.[1];
        const fixture = await readFixture(fixtures[name].fileName);
        const fixtureHash = hash(fixture);
        if (snapshotHash !== fixtureHash) {
          const { format } = await import("prettier");
          const html = await fetch("https://api.github.com/markdown", {
            method: "POST",
            body: JSON.stringify({
              text: fixture,
              context: "org/repo",
            }),
          })
            .then((r) => r.text())
            .then((html) => format(html, { parser: "html" }));
          snapshot = `<!-- hash:${fixtureHash} -->${html}`;
        }
        expect(snapshot).toMatchFileSnapshot(
          `fixtures/snapshots/${name}/github.html`,
        );
      });
    }
  });
});

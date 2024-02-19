import { expect, it, describe } from "vitest";
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
});

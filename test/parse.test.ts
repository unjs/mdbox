import { expect, it, describe } from "vitest";
import { fixtures, parsers } from "./_shared";

describe("omark:parsers", () => {
  for (const [name, { init, options, results }] of Object.entries(parsers)) {
    describe(name, async () => {
      const parser = await init(options);
      it("parse simple (snapsot)", () => {
        const parsed = parser.parse(fixtures.simple);
        if ("_test" in parsed) {
          expect(
            JSON.stringify(parsed._test, undefined, 2),
          ).toMatchFileSnapshot(`snapshots/.tmp/simple.${name}.json`);
          delete parsed._test;
        }
        results.simple = parsed;
        expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
          `snapshots/simple.${name}.json`,
        );
      });

      it("parse conmmonmark", () => {
        const parsed = parser.parse(fixtures.commonmark);
        results.commonmark = parsed;
      });
    });
  }

  describe("compare results", () => {
    for (let i = 0; i < Object.keys(parsers).length; i++) {
      const [name1, { results: r1 }] = Object.entries(parsers)[i];
      for (let j = i + 1; j < Object.keys(parsers).length; j++) {
        const [name2, { results: r2 }] = Object.entries(parsers)[j];
        describe(`${name1} vs ${name2}`, () => {
          it("simple", () => {
            expect(r1.simple).toEqual(r2.simple);
          });
        });
      }
    }
  });
});

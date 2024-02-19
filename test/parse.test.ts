import { expect, it, describe } from "vitest";
import { parsers, fixtures } from "./_shared";

describe("omark:parsers", () => {
  for (const [name, { init, options, results }] of Object.entries(parsers)) {
    describe(name, async () => {
      const parser = await init(options);
      it("parse simple (snapsot)", () => {
        const parsed = parser.parse(fixtures.simple);
        Object.assign(results, { simple: parsed });
        expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
          `snapshots/simple.${name}.json`,
        );
      });

      it("parse conmmonmark", () => {
        const parsed = parser.parse(fixtures.commonmark);
        Object.assign(results, { commonmark: parsed });
      });
    });
  }

  for (let i = 0; i < Object.keys(parsers).length; i++) {
    const [name1, { results: results1 }] = Object.entries(parsers)[i];
    for (let j = i + 1; j < Object.keys(parsers).length; j++) {
      const [name2, { results: results2 }] = Object.entries(parsers)[j];
      describe.skipIf(!results1.simple || !results2.simple)(
        `${name1} vs ${name2}`,
        () => {
          it("result", () => {
            expect(results1.simple).toEqual(results2.simple);
          });
        },
      );
    }
  }
});

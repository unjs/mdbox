import { expect, it, describe } from "vitest";
import { parsers, fixture } from "./_shared";

describe("omark:parsers", () => {
  for (const [name, { init, options, results }] of Object.entries(parsers)) {
    describe(name, async () => {
      const parser = await init(options);
      it("parse", () => {
        const parsed = parser.parse(fixture);
        Object.assign(results, { test: parsed });
        expect(JSON.stringify(parsed, undefined, 2)).toMatchFileSnapshot(
          `snapshot/${name}.json`,
        );
      });
    });
  }

  for (let i = 0; i < Object.keys(parsers).length; i++) {
    const [name1, { results: result1 }] = Object.entries(parsers)[i];
    for (let j = i + 1; j < Object.keys(parsers).length; j++) {
      const [name2, { results: result2 }] = Object.entries(parsers)[j];
      describe(`${name1} vs ${name2}`, () => {
        it("result", () => {
          expect(result1).toEqual(result2);
        });
      });
    }
  }
});

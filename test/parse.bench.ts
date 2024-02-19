import { bench } from "vitest";
import { parsers, fixtures } from "./_shared";

for (const [name, { init, options }] of Object.entries(parsers)) {
  const parser = await init(options);
  bench(name, () => {
    parser.parse(fixtures.simple);
  });
}

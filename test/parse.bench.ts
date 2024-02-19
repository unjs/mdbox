import { fixtures, parsers, readFixture } from "./parse.shared";

const isVitest = (globalThis as any).process?.env.VITEST === "true";

const { bench, run } = isVitest
  ? { ...(await import("vitest")), run: () => {} }
  : await import("mitata");

for (const [name, { init, options }] of Object.entries(parsers)) {
  const parser = await init(options);
  const md = await readFixture(fixtures.commonmarkSpec.fileName);
  bench(name, () => {
    const res = parser.parse(md);
    if (res.tree.length !== 1418) {
      throw new Error("Invalid parse result!");
    }
  });
}

run({
  percentiles: false,
});

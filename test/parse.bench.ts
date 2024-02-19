import { fixtures, parsers } from "./_shared";

const isVitest = (globalThis as any).process?.env.VITEST === "true";

const { bench, run } = isVitest
  ? { ...(await import("vitest")), run: () => {} }
  : await import("mitata");

for (const [name, { init, options }] of Object.entries(parsers)) {
  const parser = await init(options);
  bench(name, () => {
    const res = parser.parse(fixtures.commonmark);
    if (res.tree.length !== 1418) {
      throw new Error("Invalid parse result!");
    }
  });
}

run({
  percentiles: false,
});

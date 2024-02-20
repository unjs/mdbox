import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  rollup: { emitCJS: true },
  entries: ["src/index", "src/parser"],
  externals: ["omark", "mdast-util-from-markdown", "markdown-it"],
  hooks: {
    async "build:before"() {
      const { build } = await import("esbuild");
      await build({
        entryPoints: ["lib/markdown-it.ts", "lib/mdast.ts"],
        outExtension: { ".js": ".mjs" },
        bundle: true,
        outdir: "lib",
        format: "esm",
        platform: "neutral",
        mainFields: ["module", "main"],
        minify: true,
      });
    },
  },
});

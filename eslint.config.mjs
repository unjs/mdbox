import unjs from "eslint-config-unjs";

// https://github.com/unjs/eslint-config
export default unjs({
  ignores: ["lib/*.mjs"],
  rules: {
    "unicorn/expiring-todo-comments": 0,
  },
});

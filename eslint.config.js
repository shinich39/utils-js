import eslint from "@eslint/js";
import globals from "globals";

export default [
  {
    files: [
      "index.js",
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      }
    },
    rules: {
      ...eslint.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-useless-escape": "warn",
    },
  },
];
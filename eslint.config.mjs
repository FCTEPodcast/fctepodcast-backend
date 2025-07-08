import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist", "node_modules", "coverage", "jest.config.cjs"] },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
  },
];

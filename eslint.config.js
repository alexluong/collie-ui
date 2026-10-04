// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist/**", "**/storybook-static/**", "**/node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Build scripts and dev tooling run in Node.
    files: ["**/*.mjs", "**/*.cjs", "**/*.config.{js,cjs,ts}", "scripts/**"],
    languageOptions: { globals: globals.node },
    rules: {
      // Playroom and PostCSS both load their config through CommonJS.
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["packages/ui/**/*.tsx", "apps/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["packages/recipes-*/**/*.ts"],
    rules: {
      // Recipes must stay framework-free.
      "no-restricted-imports": ["error", { patterns: ["react", "react-dom", "@base-ui/*"] }],
    },
  },
);

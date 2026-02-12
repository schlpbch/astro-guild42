import js from "@eslint/js";

export default [
  {
    ignores: [
      ".husky",
      ".vscode",
      "node_modules",
      "public",
      "dist",
      ".yarn",
      ".astro",
      "**/*.astro",
      "**/*.ts",
      "**/*.tsx",
      "remark-collapse.d.ts",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        ResizeObserver: "readonly",
        IntersectionObserver: "readonly",
        cancelAnimationFrame: "readonly",
        requestAnimationFrame: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];

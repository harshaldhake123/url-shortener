import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.node,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "signature",
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "constructor",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method"
          ]
        }
      ],

      // Import rules
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      }],

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }],

      // // Promise rules
      // "promise/always-return": "warn",
      // "promise/no-nesting": "warn",
      // "promise/no-return-wrap": "error",
      // "promise/param-names": "error",

      // General JS rules
      "no-console": "warn",
      "no-debugger": "error",
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "no-implicit-coercion": "error",

      // Formatting and spacing
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
      "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "directive", "next": "*" },
        { "blankLine": "always", "prev": "*", "next": "return" },
        { "blankLine": "always", "prev": "*", "next": "if" },
        { "blankLine": "always", "prev": "*", "next": "try" }
      ],
      "no-trailing-spaces": "error",
      "no-unneeded-ternary": "error",
      "no-nested-ternary": "error",
      "no-lonely-if": "error",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": ["error", "always"],
      "arrow-body-style": ["error", "as-needed"]
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
]);

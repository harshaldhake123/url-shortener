import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tsParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";


export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

		ignores: ["src/generated/**"],

		plugins: {
			js,
			import: importPlugin,
			"unused-imports": unusedImports,
			"@typescript-eslint": tseslint.plugin,
		},

		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
			},
			globals: globals.node,
		},

		extends: [
			"@typescript-eslint/recommended",
		],

		rules: {
			/********** TypeScript Rules **********/
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
						"private-instance-method",
					],
				},
			],
			"@typescript-eslint/explicit-function-return-type": ["error", {
				allowExpressions: false,
				allowTypedFunctionExpressions: true,
				allowHigherOrderFunctions: true,
			}],

			/********** Import Rules **********/
			"import/order": [
				"error",
				{
					groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
				},
			],

			/********** Unused Imports **********/
			"unused-imports/no-unused-imports": "error",
			"unused-imports/no-unused-vars": [
				"warn",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			/********** Core JS Rules **********/
			"no-console": "warn",
			"no-debugger": "error",
			eqeqeq: ["error", "always"],
			curly: "error",
			"no-implicit-coercion": "error",
			"no-else-return": "error",
			"prefer-const": "error",
			"no-var": "error",
			"object-shorthand": ["error", "always"],
			"arrow-body-style": ["error", "as-needed"],
			"no-multi-spaces": "error",
			yoda: "error",
			complexity: "error",
			"max-depth": "error",
			"func-style": "error",

			/********** Spacing & Formatting **********/
			"lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "directive", next: "*" },
				{ blankLine: "always", prev: "*", next: "if" },
				{ blankLine: "always", prev: "*", next: "try" },
			],
			"no-trailing-spaces": "error",
			"no-unneeded-ternary": "error",
			"no-nested-ternary": "error",
			"no-lonely-if": "error",
			quotes: ["error", "single"],
			semi: "error",
			"space-before-blocks": "error",
			"arrow-spacing": "error",
			"keyword-spacing": "error",
			"space-infix-ops": "error",
			"no-template-curly-in-string": "error",
			camelcase: "error",
			"comma-spacing": "error",
			"array-bracket-spacing": "error",
			"no-spaced-func": "error",
			"key-spacing": "error",
			"space-in-parens": ["error", "never"],
			"brace-style": ["error", "1tbs"],
			"function-paren-newline": ["error", "multiline-arguments"],
			"function-call-argument-newline": ["error", "consistent"],
			"space-before-function-paren": ["error", { named: "never" }],
			indent: ["error", "tab", { SwitchCase: 1 }],
			"no-multiple-empty-lines": ["error", { max: 1 }],
		},
	},

	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
		},
	},
]);

import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import validateFileName from "eslint-plugin-validate-filename";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "validate-filename": validateFileName,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "no-console": "warn",
      "eqeqeq": ["warn", "always"],
      "quotes": ["error", "double"],
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
      "no-inline-comments": [
        "error", { 
          "ignorePattern": "TODO",
         }
        ],
      "line-comment-position": [
        "error", { 
          "position": "beside",
          "ignorePattern": "TODO",
         }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "after-used",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "import/no-anonymous-default-export": "off",
      "validate-filename/naming-rules": [
        "error",
        {
          rules: [
            {
              case: "kebab",
              target: "**/app/**",
              excludes: ["dtos"],
            },
            {
              case: "camel",
              target: "**/components/**",
            },
            {
              case: "camel",
              target: "**/config/**",
            },
            {
              case: "camel",
              target: "**/constants/**",
            },
            {
              case: "camel",
              target: "**/lib/**",
            },
            {
              case: "camel",
              target: "**/types/**",
            },
            {
              case: "camel",
              target: "**/hooks/**",
              patterns: "^use",
            }
          ],
        },
      ],
      "validate-filename/limit-extensions": [
        "error",
        {
          rules: [
            {
              target: "**/app/**",
              extensions: [".ts", ".tsx"],
            },
            {
              target: "**/hooks/**",
              extensions: [".ts", ".tsx"],
            },
            {
              target: "**/config/**",
              extensions: [".ts"],
            },
            {
              target: "**/constants/**",
              extensions: [".ts"],
            },
            {
              target: "**/lib/**",
              extensions: [".ts"],
            },
            {
              target: "**/types/**",
              extensions: [".ts"],
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      ".husky/**",
      "next-env.d.ts",
    ],
  },
  {
    settings: {
      next: {
        rootDir: ["./", "src/"],
      },
    },
  },
];

export default eslintConfig;

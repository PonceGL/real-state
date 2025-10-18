import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import validateFileName from "eslint-plugin-validate-filename";
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
    },
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "validate-filename/naming-rules": [
        "error",
        {
          rules: [
            {
              case: 'kebab',
              target: "**/app/**",
              excludes: ['dtos'],
            },
            {
              case: 'camel',
              target: "**/components/**",
            },
            {
              case: 'camel',
              target: "**/config/**",
            },
            {
              case: 'camel',
              target: "**/constants/**",
            },
            {
              case: 'camel',
              target: "**/lib/**",
            },
            {
              case: 'camel',
              target: "**/types/**",
            },
            {
              case: 'camel',
              target: "**/hooks/**",
              patterns: '^use',
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
              extensions: ['.ts', '.tsx'],
            },
            {
              target: "**/hooks/**",
              extensions: ['.ts'],
            },
            {
              target: "**/config/**",
              extensions: ['.ts'],
            },
            {
              target: "**/constants/**",
              extensions: ['.ts'],
            },
            {
              target: "**/lib/**",
              extensions: ['.ts'],
            },
            {
              target: "**/types/**",
              extensions: ['.ts'],
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

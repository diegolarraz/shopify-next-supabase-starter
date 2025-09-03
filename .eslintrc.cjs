// .eslintrc.cjs
/* eslint-env node */
module.exports = {
    root: true,
    extends: [
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: __dirname,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: [
      "@typescript-eslint",
    ],
    ignorePatterns: [
      "node_modules/",
      ".next/",
      "out/",
      ".turbo/",
      "coverage/",
      "lib/gql/**",
      "**/*.generated.*",
      "**/*.d.ts",
    ],
    rules: {
      "eqeqeq": ["error", "smart"],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-undef": "off",
      "@typescript-eslint/no-explicit-any": ["error", { fixToUnknown: true, ignoreRestArgs: false }],
  
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSAsExpression",
          message: "Do not use type assertions (as). Refactor with generics, narrowing, or proper types.",
        },
        {
          selector: "TSTypeAssertion",
          message: "Do not use type assertions (<Type>value). Refactor with generics, narrowing, or proper types.",
        },
      ],
  
      "@typescript-eslint/no-floating-promises": ["error", { ignoreIIFE: true }],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", disallowTypeAnnotations: false }],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "minimumDescriptionLength": 5,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "all", caughtErrorsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
        "no-restricted-imports": [
            "error",
            {
            "patterns": [
                    {
                        "group": ["@/lib/db/*", "@/lib/api/*"],
                        "message": "Components should use React Query hooks (app/hooks/*), not repositories/services directly."
                    }
                ]
            }
        ]
    },
  
    overrides: [
      {
        files: ["*.config.js", "*.config.cjs", "next.config.js", "next.config.mjs", "postcss.config.js", "tailwind.config.js"],
        rules: {
          "@typescript-eslint/no-var-requires": "off",
        },
      },
      {
        files: ["**/*.js"],
        extends: ["next/core-web-vitals"],
        parser: "espree",
        parserOptions: { ecmaVersion: "latest", sourceType: "module" },
        rules: {},
      },
      {
        files: ["app/**/*.{ts,tsx}"],
        rules: {
          "no-restricted-imports": [
            "error",
            { "patterns": [{ "group": ["@/lib/db/*", "@/lib/api/*"], "message": "Use hooks (app/hooks/*), not repositories/services directly." }] }
          ]
        }
      }
    ],
  };
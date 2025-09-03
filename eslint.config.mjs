import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".turbo/**",
      "coverage/**",
      "lib/gql/**",
      "**/*.generated.*",
      "**/*.d.ts",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      prettier: (await import("eslint-plugin-prettier")).default,
      import: (await import("eslint-plugin-import")).default,
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // Core rules
      eqeqeq: ["error", "smart"],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Import ordering and organization rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // External packages
            "internal", // Internal modules (using tsconfig paths)
            "parent", // Parent directories
            "sibling", // Same directory
            "index", // Index files
            "type", // Type-only imports
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          distinctGroup: false,
        },
      ],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // TypeScript handles this
    },
  },
  // Apply prettier config to disable conflicting rules
  prettierConfig,
];

export default eslintConfig;

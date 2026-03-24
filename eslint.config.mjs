import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "screenshot.cjs",
    "test_prisma.cjs",
    "tmp/take_screenshots.cjs",
    "take_screenshots.cjs",
    "screenshot.js",
    "test_prisma.js",
    "tmp/take_screenshots.js",
    "take_screenshots.js",
  ]),
]);

export default eslintConfig;

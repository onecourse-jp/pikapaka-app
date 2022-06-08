module.exports = {
  root: true,
  parser: require.resolve("@typescript-eslint/parser"),
  extends: ["@react-native-community", "eslint-config-prettier"],
  plugins: ["prettier", "react-native"],
  ignorePatterns: [".eslintrc.js"],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
    ecmaVersion: 6,
    jsxPragma: "React",
    createDefaultProgram: true,
  },
  ignorePatterns: [],
  extends: ["react-strong"],
};

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ["airbnb", "eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  }
};

module.exports = {
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:jest/recommended"
  ],
  settings: {
    "react": {
      "version": "16.8"
    }
  },
  globals: {
    "page": true,
    "browser": true,
    "jestPuppeteer": true,
    "fetch": false
  }
}

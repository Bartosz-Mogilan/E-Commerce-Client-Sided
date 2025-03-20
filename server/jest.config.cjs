module.exports = {
  globalSetup: "./tests/globalSetup.mjs",
  globalTeardown: "./tests/globalTeardown.mjs",
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(strip-ansi|ansi-regex)/)"
  ],
  extensionsToTreatAsEsm: [], 
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", 
  },
};



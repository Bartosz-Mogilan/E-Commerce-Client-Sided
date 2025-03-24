module.exports = {
  globalSetup: "./tests/globalSetup.mjs",
  globalTeardown: "./tests/globalTeardown.mjs",
  testEnvironment: "node",
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};




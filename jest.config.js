module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
  modulePaths: ["<rootDir>/src"],
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};

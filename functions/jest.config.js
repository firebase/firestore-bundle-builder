module.exports = {
  rootDir: "./",
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: "<rootDir>/__tests__/tsconfig.json",
    }],
  },
  testMatch: ["**/__tests__/*.test.ts"],
  testEnvironment: "node",
};

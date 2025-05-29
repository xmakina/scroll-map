import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  displayName: "integration",
  testMatch: ["**/*.integration.[jt]s?(x)"],
  globalSetup: "<rootDir>/test_setup/integration/setup.ts",
  globalTeardown: "<rootDir>/test_setup/integration/teardown.ts",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

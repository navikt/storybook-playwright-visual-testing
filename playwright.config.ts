// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

// We need to make the base URL configurable so we can
// change it when running tests in a Docker container.
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:6006";

export default defineConfig({
  // ...
  // Using the `html` reporter for visual diffing.
  reporter: process.env.CI ? "html" : "dot",
  // ...
  use: {
    baseURL: BASE_URL,
    // ...
  },
  // I recommend to run regression tests at
  // least for desktop and mobile devices.
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 15"],
      },
    },
  ],
  // Run your local dev server before starting the tests
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run storybook",
        url: BASE_URL,
        reuseExistingServer: true,
      },
});

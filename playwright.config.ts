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
    baseURL: "http://127.0.0.1:8080",
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
        command: "npx http-server ./storybook-static",
        url: "http://127.0.0.1:8080",
        reuseExistingServer: !process.env.CI,
      },
});

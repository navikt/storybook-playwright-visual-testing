import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: process.env.CI ? "html" : "dot",

  use: {
    baseURL: "http://localhost:8080",
  },
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
  webServer: process.env.CI
    ? undefined
    : {
        command: "npx http-server ./storybook-static",
        url: "http://127.0.0.1:8080",
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      },
});

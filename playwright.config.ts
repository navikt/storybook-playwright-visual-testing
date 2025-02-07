import { defineConfig, devices } from "@playwright/test";

const port = 4243;

export default defineConfig({
  reporter: "html",

  use: {
    baseURL: `http://localhost:${port}`,
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
  webServer: {
    command: `npx http-server ./storybook-static -p ${port}`,
    port,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});

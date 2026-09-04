import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  outputDir: './test-results',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'off',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  expect: { timeout: 7_000 },

  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 13'],
      },
    },
    {
      name: 'mobile-webkit',
      use: {
        ...devices['iPhone 13'],
        browserName: 'webkit',
      },
    },
  ],

  webServer: process.env.CI
    ? undefined
    : {
        command: 'npx serve --single --listen 4173 dist/read-punjabi/browser',
        port: PORT,
        reuseExistingServer: true,
        timeout: 60_000,
      },
});

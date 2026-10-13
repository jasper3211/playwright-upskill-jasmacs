import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './setup/login.setup.js',  // Specify the path to your global login setup script
  use: {
    baseURL: 'https://www.saucedemo.com',
    storageState: 'setup/loginState.json', // This will use the login state across all tests
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  testDir: './playwright_upskill', // Test folder
  reporter: [['list'], ['html', { open: 'never' }]], // HTML report is uploaded by CI
  retries: 0,
  workers: 3,

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
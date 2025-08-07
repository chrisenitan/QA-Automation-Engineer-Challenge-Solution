import { defineConfig, devices } from '@playwright/test';
import { systemUnderTest } from './environment';
import { appLanguagesT } from './types';
const sut = systemUnderTest(`${<appLanguagesT>process.env.LANGUAGE || 'en'}`);

export default defineConfig({
  reporter: [[process.env.CI ? 'github' : 'list'], ['html', { outputFolder: './playwright/html-report', open: 'never' }]],
  globalSetup: './global-setup',
  expect: {
    timeout: 5000
  },
  use: {
    locale: 'en-US',
    timezoneId: 'Europe/Berlin',
    trace: 'on',
    headless: process.env.CI ? true : process.env.PLAYWRIGHT_HEADLESS === 'true',
    testIdAttribute: 'data-testid'
  },
  projects: [
    {
      name: 'desktopApp',
      testDir: 'test/desktop',
      timeout: 20000,
      retries: process.env.CI ? 1 : 0,
      use: {
        permissions: ['clipboard-read', 'clipboard-write'],
        video: process.env.CI ? 'off' : 'on',
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        baseURL: sut.baseUrl('desktopApp')
      }
    },
    {
      name: 'api',
      testDir: 'test/api',
      timeout: 20000,
      retries: process.env.CI ? 1 : 0,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: sut.baseUrl('api')
      }
    }
  ]
});

import { test as base, expect } from '@playwright/test';
import { LimeHomeDesktop } from '@services/ui';
import { testData as baseTestData } from '@data/index';
import { apiResponseSchemas as baseApiSchema } from '@data/api_schemas';
import { Api } from '../../api';
import { ApiAssertions } from '@services/api/custom_api_assertions';

//custom api assertions
expect.extend({ ...ApiAssertions });

//note: fixtures scope are also subject to test hooks and number of workers. see https://playwright.dev/docs/test-fixtures#execution-order
export const test = base.extend<
  {
    LimeHomeDesktop: LimeHomeDesktop;
    Api: Api;
  },
  { testData: typeof baseTestData; apiSchemas: typeof baseApiSchema }
>({
  testData: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await use({ ...baseTestData });
    },
    { scope: 'worker' }
  ],

  apiSchemas: [
    // eslint-disable-next-line no-empty-pattern
    async ({}, use) => {
      await use({ ...baseApiSchema });
    },
    { scope: 'worker' }
  ],

  LimeHomeDesktop: [
    async ({ browser }, use, testInfo) => {
      const pageBrowserContext = await browser.newContext();
      await pageBrowserContext.grantPermissions(['clipboard-read', 'clipboard-write']);
      const page = await pageBrowserContext.newPage();
      const limehomeApp = new LimeHomeDesktop({ page, testInfo });
      await use(limehomeApp);
    },
    { scope: 'test' }
  ],

  Api: [
    // eslint-disable-next-line no-empty-pattern
    async ({ request }, use) => {
      const limehomeApi = new Api({
        client: request
      });
      await use(limehomeApi);
    },
    { scope: 'test' }
  ]
});
export { expect, chromium } from '@playwright/test';

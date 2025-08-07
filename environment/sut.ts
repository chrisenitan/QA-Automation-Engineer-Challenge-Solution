import { Page } from 'playwright';
import { language } from '../data/i18n';
import { baseUrls, Systems } from '../environment';
import * as T from '../types';
import 'dotenv/config';

export const systemUnderTest = (lang: T.appLanguagesT) => ({
  strings: language[lang],

  /**
   * Allows properly escaped test timeouts
   */
  waitForTimeout: async (args: { page: Page; timeout: number; reason: string }) => {
    if (args.reason.length < 2) return console.log('invalid timeout escape');
    console.log(`Test waiting for page: ${args.reason}`);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await args.page.waitForTimeout(args.timeout);
  },

  describeTitle(title: string) {
    return `[${title}] › [${process.env.LANGUAGE || 'en'} - ${sutHelper.env()}]`;
  },

  baseUrl: (sys: Systems) => {
    const env = sutHelper.env();
    return baseUrls[sys][env];
  }
});

export const sutHelper = {
  /**
   * Defaults to limehome production env
   */
  env: (): T.Environments => {
    return `${process.env.ENVIRONMENT || 'prod'}` as T.Environments;
  }
};

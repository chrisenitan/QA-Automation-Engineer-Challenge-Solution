import { StayDates } from '@globalTypes/*';
import { format } from 'date-fns';
import { Page, TestInfo } from 'playwright/test';

export class Utils {
  page?: Page;

  testInfo?: TestInfo;
  constructor(args?: { page?: Page; testInfo?: TestInfo }) {
    this.testInfo = args?.testInfo;
    this.page = args?.page;
  }

  /**
   * Creates a valid Playwright test hook tag object
   * See https://playwright.dev/docs/test-annotations#tag-tests
   */
  addTags(args: string) {
    const tag = args.split(',').map(t => `@${t.trim()}`);
    return { tag };
  }

  /**
   * Originally written to allow us create a valid but reliable test date in the middle of the month by starting on 15th and ending on 18th
   * @returns a valid StayDates prop
   */
  fakeDay(args: { day: number }) {
    const today = new Date();
    const forcedDay = new Date(today.getFullYear(), today.getMonth(), args.day);
    const formatted = format(forcedDay, 'MM-dd-yyyy');
    return formatted as StayDates['checkIn'];
  }

  /**
   * Creates a valid JSON payload from intercepted FE request
   */
  async getResponse(args: { responsePromise: Promise<any> }) {
    const { responsePromise } = args;
    const res = await responsePromise;
    const payload = JSON.parse(await res.text());
    const status = res.status();
    return { payload, res, status };
  }
}

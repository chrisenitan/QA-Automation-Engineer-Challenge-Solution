import { Page } from 'playwright';
import { expect, Locator } from 'playwright/test';
import { systemUnderTest } from '../../../environment';
const sut = systemUnderTest(`${<'en'>process.env.LANGUAGE || 'en'}`);

export class Input {
  page: Page;
  constructor(args: { page: Page }) {
    this.page = args.page;
  }

  /**
   * Calls a blur after filling a basic input field, we need this to make sure change event is dispatched on the field
   */
  async fillBlur(locator: Locator, value: string) {
    await locator.fill(value);
    await locator.blur();
  }

  /**
   * Confirms the error node under any given input field is present and contains error hint
   */
  async assertError(args: { errorNodeId: string; error?: string }) {
    const error = args.error || sut.strings.errorHint;
    const node = this.page.locator(`#${args.errorNodeId}`).filter({ hasText: error });
    await expect(node).toBeVisible();
  }
}

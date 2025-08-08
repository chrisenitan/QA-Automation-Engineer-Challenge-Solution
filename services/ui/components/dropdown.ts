import { ui } from '@data/uiSelectors';
import { Page } from 'playwright';

/**
 * Handles all dropdown Select-variant components
 */
export class DropDown {
  page: Page;
  constructor(args: { page: Page }) {
    this.page = args.page;
  }

  async selectOption(args: { dropDownName: 'cities'; option: string }) {
    const { option, dropDownName } = args;
    const { parent, options } = ui.dropdowns[dropDownName];
    await this.page.locator(`#${parent}`).first().click();
    await this.page
      .locator(`#${options}`)
      .locator(`#${ui.dropdowns.cities.getCityNameId(option)}`)
      .first()
      .click();
  }
}

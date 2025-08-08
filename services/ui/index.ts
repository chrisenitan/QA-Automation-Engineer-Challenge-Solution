import { Page } from 'playwright';
import { TestInfo } from 'playwright/test';
import { BaseHomePage } from './pages/home';
import { BasePropertyPage } from './pages/property';
import { ui } from '@data/uiSelectors';
import { BaseCheckoutPage } from './pages/checkout';

export class LimeHomeDesktop {
  //pages
  homePage: BaseHomePage;
  checkoutPage: BaseCheckoutPage;
  propertyPage: BasePropertyPage;
  //assets
  testInfo: TestInfo;
  commonSteps: AppCommons;
  page: Page;

  constructor(args: { page: Page; testInfo: TestInfo }) {
    this.testInfo = args.testInfo;
    //assets
    this.page = args.page;
    this.commonSteps = new AppCommons(args);
    //pages
    this.homePage = new BaseHomePage(args);
    this.propertyPage = new BasePropertyPage(args);
    //components
    this.checkoutPage = new BaseCheckoutPage(args);
  }
}

/**
 * Methods for test steps that are common to all pages
 */
export class AppCommons {
  page: Page;

  constructor(args: { page: Page }) {
    this.page = args.page;
  }

  async handleCookie(args: { choice: 'acceptAll' }) {
    if (args.choice != 'acceptAll') return; //we don't need other actions yet
    await this.page.getByTestId(ui.cookies.acceptAllBtn).click();
  }
}

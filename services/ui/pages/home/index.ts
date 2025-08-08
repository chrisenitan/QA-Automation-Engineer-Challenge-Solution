import { ui } from '../../../../data';
import { Page } from 'playwright';
import { appLanguagesT } from '../../../../types';
import { StayDates, Submission } from '@globalTypes/';
import { Utils } from '@utils/index';
import { systemUnderTest } from '@environment/index';
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');
import { DropDown } from '@services/ui/components/dropdown';
import { DatePicker } from '@services/ui/components/date_picker';

type StaySearchParameters = { cityName: string; dates: StayDates };

export class BaseHomePage {
  utils: Utils;
  page: Page;
  //components
  dropDown: DropDown;
  datePicker: DatePicker;

  constructor(args: { page: Page }) {
    this.utils = new Utils(args);
    this.page = args.page;
    this.dropDown = new DropDown(args);
    this.datePicker = new DatePicker(args);
  }

  /**
   * Limehome base URL
   */
  async goto(args?: { endpoint: string }) {
    await this.page.goto(`/${args?.endpoint || ''}`);
  }

  /**
   * Ideally I would love to check for page header and logo or something generic that confirms is limehome UI loaded
   */
  async assertPage() {
    await sut.waitForTimeout({ timeout: 2000, reason: 'generic, to be removed', page: this.page });
  }

  /**
   * Applies location and dates to the search field on the home page
   */
  async searchStay(args: StaySearchParameters & Submission) {
    await this.dropDown.selectOption({ dropDownName: 'cities', option: args.cityName });
    await this.datePicker.selectDates(args.dates);
    const submitAfter = args.submitAfter ?? true;
    if (!submitAfter) return;
    const responsePromise = this.page.waitForResponse('**/api/frontend**');
    await this.page.locator(`#${ui.home.searchButton}`).click();
    await this.utils.getResponse({ responsePromise });
  }
}

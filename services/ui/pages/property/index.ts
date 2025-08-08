import { ui } from '../../../../data';
import { Locator, Page } from 'playwright';
import { appLanguagesT, StayDates } from '@globalTypes/';
import { Utils } from '@utils/index';
import { systemUnderTest } from '@environment/index';
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');
import { DropDown } from '@services/ui/components/dropdown';
import { DatePicker } from '@services/ui/components/date_picker';

export type CartModalDataSummary = { removeUnitBtn: Locator; suiteName: string; reserveSuiteBtn: Locator };

export class BasePropertyPage {
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
   * Sample URL https://www.limehome.com/suites?property=213
   */
  async goto(args: { endpoint?: string; id: number }) {
    //https://www.limehome.com/suites?property=213
    await this.page.goto(`/suites?property=${args.id}${args.endpoint || ''}`);
  }

  /**
   * Ideally I would love to check for page header and logo or something generic that confirms is limehome UI loaded
   */
  async assertPage() {
    await sut.waitForTimeout({ timeout: 2000, reason: 'generic, to be removed', page: this.page });
  }

  /**
   *
   * @returns Object of Property details extracted from the UI
   */
  async extractPropertyDetails() {
    const propertyName = await this.page.locator(`.${ui.property.suiteTitle}`).first().innerText();
    const propertyAddress = await this.page.locator(`.${ui.property.suiteAddress}`).first().innerText();
    return { propertyName, propertyAddress };
  }

  /**
   * Waits for offers request response so that available suites CTA can be selectable
   */
  async editBookingDates(dates: StayDates) {
    await this.page.locator(`#${ui.datePicker.invokeCalendar}`).first().click();
    const responsePromise = this.page.waitForResponse('**/offers**');
    await this.datePicker.selectDates(dates);
    await this.utils.getResponse({ responsePromise });
  }

  /**
   * Gets all available suites on a property page. Returns an array of object of props for each suite found
   */
  async getSuites() {
    const suites = await this.page.getByTestId(ui.property.suitesCells).all();
    const suitesAttributes = await Promise.all(
      suites.map(async s => {
        const cta = s.getByTestId(ui.property.suites.selectBtn); //select, change similar but better to provide precise naming for readability
        return {
          //!we need a title test id here, h3 is unreliable if Devs later add other headers.
          name: await s.locator('h3').innerText(),
          selectBtn: cta,
          changeDateBtn: cta
        };
      })
    );
    return { suites: suitesAttributes };
  }

  /**
   * ? could add a toast validator here later
   */
  async addSuite(args: { suiteName: string; action: 'addThenExplore' | 'addThenReview' }) {
    const { suites } = await this.getSuites();
    const [suite] = suites.filter(async s => s.name.includes(args.suiteName));
    await suite.selectBtn.click();
    await this.page
      .getByTestId(ui.cart.addModal)
      .getByRole('button')
      .filter({ hasText: sut.strings.property.cart.ctas[args.action] })
      .click();
  }

  /**
   * Extracts all possible data from a cart modal
   * Will allow overview, summary and empty empty so we can know what selectors to resolve
   * ! would have to make a real testid for hackCartSummarySuiteTitle
   */
  async extractCartModal<T>(args: { stage: 'summary' }) {
    if (args.stage != 'summary') return {} as T; //not handling other cases now
    return {
      removeUnitBtn: this.page.getByTestId(ui.cart.detailsModal).getByTestId(ui.cart.removeUnitBtn),
      suiteName: await this.page.locator(ui.cart.hackCartSummarySuiteTitle).innerText(),
      reserveSuiteBtn: this.page
        .getByTestId(ui.cart.detailsModal)
        .getByRole('button')
        .filter({ hasText: sut.strings.property.cart.ctas.reserveCart })
    } as T;
  }

  async openCart() {
    await this.page.getByTestId(ui.property.cart.guestInfo).click();
  }
}

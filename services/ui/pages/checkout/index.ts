import { expect } from '@playwright/test';
import { ui } from '../../../../data';
import { Page } from 'playwright';
import { Submission } from '@globalTypes/';
import { Utils } from '@utils/index';
import { DropDown } from '@services/ui/components/dropdown';
import { DatePicker } from '@services/ui/components/date_picker';
import { Input } from '@services/ui/components/input';

type UserDetails = {
  guestFirstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
  receiveNewsletter: boolean;
};

export class BaseCheckoutPage {
  utils: Utils;
  page: Page;
  //components
  dropDown: DropDown;
  datePicker: DatePicker;
  input: Input;

  constructor(args: { page: Page }) {
    this.utils = new Utils(args);
    this.page = args.page;
    this.dropDown = new DropDown(args);
    this.datePicker = new DatePicker(args);
    this.input = new Input(args);
  }

  /**
   * ui.checkout.cartTotal assertion sis necessary to ensure Checkout page does not reset test component after assertions begin
   */
  async assertPage() {
    await expect(this.page.locator(`#${ui.checkout.forms.userDetailsFields.guestFirstName}`)).toBeAttached();
    await expect(this.page.getByTestId(ui.checkout.forms.voucher.voucherField)).toBeAttached();
    await expect(this.page.getByTestId(ui.checkout.cartTotal)).toBeVisible();
  }

  /**
   * Not sure I will use this but was working on basket price assertions
   */
  async assertBasket() {
    await expect(this.page.locator(`#${ui.checkout.forms.userDetailsFields.guestFirstName}`)).toBeAttached();
    await expect(this.page.getByTestId(ui.checkout.forms.voucher.voucherField)).toBeAttached();
  }

  /**
   * Clicks all sorts of step contuniation on the checkout cart
   */
  async continueCart(stage: 'gotoRatesBtn' | 'nextToPaymentStepBtn' | 'confirmAndPayBtn') {
    await this.page.getByTestId(ui.checkout.buttons[stage]).click();
  }

  async fillUserDetailsForm(args: { form: UserDetails } & Submission) {
    for (const [key, value] of Object.entries(args.form)) {
      //we don't need to handle the newsletter here
      if (typeof value != 'string') return;
      if (value) await this.input.fillBlur(this.page.locator(`#${ui.checkout.forms.userDetailsFields[<'city'>key]}`), value);
    }
    // we can handle newsletter checkbox here...
    const submitAfter = args.submitAfter ?? true;
    if (!submitAfter) return;
    await this.continueCart('gotoRatesBtn');
  }

  async validateUserDetailsForm(args: { fields: string[]; hidden: boolean }) {
    for (const value of args.fields) {
      if (args.hidden) await expect(this.page.locator(`#${value}`)).not.toBeVisible();
      if (!args.hidden) {
        await this.input.assertError({ errorNodeId: value });
      }
    }
  }
}

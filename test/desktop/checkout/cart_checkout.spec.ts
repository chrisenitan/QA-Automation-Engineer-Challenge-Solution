import { test } from '@services/ui/fixtures/index.fixtures';
import { systemUnderTest } from '@environment/index';
import { Utils } from '@utils/index';
import { appLanguagesT } from '../../../types';
import { CartModalDataSummary } from '@services/ui/pages/property';
import { ui } from '@data/uiSelectors';
const utils = new Utils();
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');

test.describe(sut.describeTitle('Desktop Checkout Page'), utils.addTags('checkout'), () => {
  test.beforeEach(async ({ LimeHomeDesktop: app, testData }) => {
    const suiteSName = testData.properties.aachen.units[0].name;
    await app.homePage.goto();
    await app.commonSteps.handleCookie({ choice: 'acceptAll' });
    //*this could be later done via cart API that returns a URL, so we can shave off some seconds from UI steps
    await test.step('Create a valid Cart', async () => {
      await app.propertyPage.goto({ id: testData.properties.aachen.id });
      await app.propertyPage.assertPage();
      await app.propertyPage.editBookingDates({
        checkIn: utils.fakeDay({ day: 15 }), //every month has a valid 15th
        checkOut: utils.fakeDay({ day: 15 + 3 }) //every month has a valid 18th
      });
      await app.propertyPage.addSuite({ suiteName: suiteSName, action: 'addThenReview' });
      const { reserveSuiteBtn } = await app.propertyPage.extractCartModal<CartModalDataSummary>({ stage: 'summary' });
      await reserveSuiteBtn.click();
      //! this is really important. If not added, Checkout page may lazy load basket summary causing components undergoing tests to reset
      await app.checkoutPage.assertPage();
    });
  });

  /**
   * This test escapes invalidating some fields since they don not have a uniform ID with the rest of the form fields.
   * Eg: checkout-signup-create-password-error vs checkout-signup-create-password-error
   */
  test('Can proceed only after filling the checkout section', utils.addTags('input'), async ({ LimeHomeDesktop: app, testData }) => {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(ui.checkout.forms.userDetailsFields)) {
      if (!['receiveNewsletter', 'country', 'phoneNumber'].includes(key)) fields.push(`${value}-error`);
    }
    await app.checkoutPage.continueCart('gotoRatesBtn');
    await app.checkoutPage.validateUserDetailsForm({ fields, hidden: false });
    await app.checkoutPage.fillUserDetailsForm({
      form: { ...testData.validCheckoutUser }
    });
    await app.checkoutPage.validateUserDetailsForm({ fields, hidden: true });
  });

  // eslint-disable-next-line no-empty-pattern
  test.afterAll(async ({}, testInfo) => {
    if (testInfo.status != 'passed') return;
    //nothing yet but this is where we would use the API to delete bloats
  });
});

import { expect, test } from '@services/ui/fixtures/index.fixtures';
import { systemUnderTest } from '@environment/index';
import { Utils } from '@utils/index';
import { appLanguagesT } from '../../../types';
import { CartModalDataSummary } from '@services/ui/pages/property';
const utils = new Utils();
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');

/**
 * Experimenting with a native way to record detailed test steps so we can substitute excel sheets
 */
const experimentalLogStep = async (step: string) => {
  await test.step(step, async () => {});
};

test.describe(sut.describeTitle('Desktop Property Page'), utils.addTags('property, unit, suite'), () => {
  test.beforeEach(async ({ LimeHomeDesktop: app }) => {
    await app.homePage.goto();
    await app.commonSteps.handleCookie({ choice: 'acceptAll' });
  });

  test('Can add and remove suite from the cart', utils.addTags('modal'), async ({ LimeHomeDesktop: app, testData }) => {
    const suiteSName = testData.properties.aachen.units[0].name;
    await app.propertyPage.goto({ id: testData.properties.aachen.id });
    await app.propertyPage.assertPage();
    experimentalLogStep('add a booking date to property');
    await app.propertyPage.editBookingDates({
      checkIn: utils.fakeDay({ day: 15 }), //every month has a valid 15th
      checkOut: utils.fakeDay({ day: 15 + 3 }) //every month has a valid 18th
    });
    experimentalLogStep('add an available suite to cart');
    await app.propertyPage.addSuite({ suiteName: suiteSName, action: 'addThenReview' }); //Suite S
    experimentalLogStep('get cart details and check that title and address are present');
    const { removeUnitBtn, suiteName } = await app.propertyPage.extractCartModal<CartModalDataSummary>({ stage: 'summary' });
    expect(suiteName).toContain(suiteSName);
    await expect(removeUnitBtn).toBeAttached();
    await removeUnitBtn.click();
    await expect(removeUnitBtn).not.toBeAttached();
  });

  test('Can edit cart from ongoing property exploration', utils.addTags('modal'), async ({ LimeHomeDesktop: app, testData }) => {
    const suiteSName = testData.properties.aachen.units[0].name;
    await app.propertyPage.goto({ id: testData.properties.aachen.id });
    await app.propertyPage.assertPage();
    await app.propertyPage.editBookingDates({
      checkIn: utils.fakeDay({ day: 15 }), //every month has a valid 15th
      checkOut: utils.fakeDay({ day: 15 + 3 }) //every month has a valid 18th
    });
    await app.propertyPage.addSuite({ suiteName: suiteSName, action: 'addThenExplore' }); //Suite S
    await app.propertyPage.openCart();
    const { removeUnitBtn, suiteName } = await app.propertyPage.extractCartModal<CartModalDataSummary>({ stage: 'summary' });
    expect(suiteName).toContain(suiteSName);
    await expect(removeUnitBtn).toBeAttached();
    await removeUnitBtn.click();
    await expect(removeUnitBtn).not.toBeAttached();
  });

  // eslint-disable-next-line no-empty-pattern
  test.afterAll(async ({}, testInfo) => {
    if (testInfo.status != 'passed') return;
    //nothing yet but this is where we would use the API to delete bloats
  });
});

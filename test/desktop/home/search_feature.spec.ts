import { expect, test } from '@services/ui/fixtures/index.fixtures';
import { systemUnderTest } from '@environment/index';
import { Utils } from '@utils/index';
import { appLanguagesT } from '../../../types';
const utils = new Utils();
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');

test.describe(sut.describeTitle('Desktop Home Page'), utils.addTags('homes'), () => {
  test.beforeEach(async ({ LimeHomeDesktop: app }) => {
    await app.homePage.goto();
    await app.commonSteps.handleCookie({ choice: 'acceptAll' });
  });

  test('Can engage with Stay search fields', utils.addTags('search, calendar'), async ({ LimeHomeDesktop: app, testData }) => {
    await app.homePage.assertPage();
    await app.homePage.searchStay({
      cityName: testData.properties.aachen.shortName,
      dates: {
        checkIn: utils.fakeDay({ day: 15 }), //every month has a valid 15th
        checkOut: utils.fakeDay({ day: 15 + 3 }) //every month has a valid 18th
      }
    });
    const { propertyName, propertyAddress } = await app.propertyPage.extractPropertyDetails();
    expect(propertyName).toContain(testData.properties.aachen.name);
    expect(propertyAddress).toContain(testData.properties.aachen.location.addressLine1);
  });

  // eslint-disable-next-line no-empty-pattern
  test.afterAll(async ({}, testInfo) => {
    if (testInfo.status != 'passed') return;
    //nothing yet but this is where we would use the API to delete bloats
  });
});

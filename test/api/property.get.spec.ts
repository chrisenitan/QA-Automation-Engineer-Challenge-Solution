import { test, expect } from '@services/ui/fixtures/index.fixtures';
import { systemUnderTest } from '@environment/index';
import { Utils } from '@utils/index';
import { appLanguagesT } from '../../types';
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');
const utils = new Utils();

test.describe(sut.describeTitle('GET Property API'), utils.addTags('property'), () => {
  test('GET a Property returns 200 success status code', async ({ Api }) => {
    const { status } = await Api.property.get({ id: 129 });
    expect(status).toBeOkResponse();
  });

  test('GET a Property returns failed statuses for invalid requests', async ({ Api }) => {
    const statuses = {
      404: 123456789890, //!a property will clock this one day
      400: 0
    };
    for (const [key, value] of Object.entries(statuses)) {
      await test.step(`Assert status code ${key} for invalid request id ${value}`, async () => {
        const { status } = await Api.property.get({ id: value });
        expect(status).toBe(Number.parseInt(key));
      });
    }
  });

  test('GET a Property returns expected response body', utils.addTags('schema'), async ({ Api, apiSchemas }) => {
    const { body } = await Api.property.get({ id: 129 });
    expect(body).toBeExpectedPayload(apiSchemas.response.property.get);
  });
});

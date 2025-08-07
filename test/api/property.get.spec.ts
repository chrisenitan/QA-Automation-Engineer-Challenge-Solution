import { test, expect } from '@services/ui/fixtures/index.fixtures';
import { systemUnderTest } from '@environment/index';
import { Utils } from '@utils/index';
import { appLanguagesT } from '../../types';
const sut = systemUnderTest((process.env.LANGUAGE as appLanguagesT) ?? 'en');
const utils = new Utils();

test.describe(sut.describeTitle('Property API'), utils.addTags('property'), () => {
  test('GET a Property', async ({ Api }) => {
    const { status } = await Api.property.get({ id: 129 });
    expect(status).toBeOkResponse();
  });
});

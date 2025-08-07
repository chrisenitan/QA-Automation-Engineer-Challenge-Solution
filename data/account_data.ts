import { faker } from '@faker-js/faker';

export const testData = {
  properties: {
    aachen: {
      id: 129,
      shortName: 'aachen',
      name: 'aachen vereinsstraße',
      location: {
        lat: 50.7697713,
        lng: 6.0931558,
        city: 'Aachen',
        postalCode: '52062',
        countryCode: 'DE',
        addressLine1: 'Vereinsstraße 2',
        countryName: 'Germany'
      },
      units: [{ name: 'Suite S' }]
    }
  },
  validCheckoutUser: {
    guestFirstName: `PWTest${faker.person.firstName()}`,
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: '0331 2739939 ', //generated on https://www.fakexy.com/fake-phonenumber-generator-de
    password: 'hikskTYJ!@04SFf',
    street: faker.location.streetAddress(),
    postCode: faker.location.zipCode('#####'),
    city: faker.location.city(),
    country: 'Germany',
    receiveNewsletter: faker.datatype.boolean()
  }
};

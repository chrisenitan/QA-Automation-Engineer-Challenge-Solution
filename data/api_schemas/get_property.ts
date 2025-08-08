export const getProperty = {
  type: 'object',
  required: ['success', 'payload', 'message'],
  properties: {
    payload: {
      type: 'object',
      required: ['id', 'name', 'description', 'location', 'unit_groups'],
      additionalProperties: true,
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        description: { type: 'string' },
        unit_groups: { type: 'array', items: [{ type: 'object', required: ['id', 'title', 'name'] }] },
        location: {
          type: 'object',
          additionalProperties: false,
          required: ['lat', 'lng', 'city', 'postalCode', 'countryCode', 'addressLine1', 'countryName'],
          properties: {
            lat: { type: 'number' },
            lng: { type: 'number' },
            description: { type: 'string' },
            city: { type: 'string' },
            postalCode: { type: 'string' },
            countryCode: { type: 'string' },
            addressLine1: { type: 'string' },
            countryName: { type: 'string' }
          }
        }
      }
    }
  }
};

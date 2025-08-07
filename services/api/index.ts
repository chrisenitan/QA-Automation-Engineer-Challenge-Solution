import { APIRequestContext, APIResponse } from '@playwright/test';

//wip
type PropertyPayload = { payload: { id: 129 } };

export class Api {
  property: PropertyApi;
  client: APIRequestContext;

  constructor(args: { client: APIRequestContext }) {
    this.client = args.client;
    this.property = new PropertyApi(args);
  }
}

class PropertyApi {
  client: APIRequestContext;
  constructor(args: { client: APIRequestContext }) {
    this.client = args.client;
  }

  async get(args: { id: number }): Promise<{
    body: PropertyPayload;
    status: number;
  }> {
    try {
      const property = await this.client.get(`properties/${args.id}`);
      return apiHelpers.asResponse<PropertyPayload>(property);
    } catch (error: any) {
      return error.response;
    }
  }
}

const apiHelpers = {
  async asResponse<T>(res: APIResponse) {
    const body = await res.json();
    const status = res.status();
    return { body, status } as { body: T; status: number };
  }
};

export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeOkResponse(): Promise<R>;
      // eslint-disable-next-line no-unused-vars
      toBeExpectedPayload(schema: Record<string, any>): Promise<R>;
    }
  }
}

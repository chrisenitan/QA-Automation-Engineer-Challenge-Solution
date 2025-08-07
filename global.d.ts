export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeOkResponse(): Promise<R>;
      // eslint-disable-next-line no-unused-vars
      toBeExpectedPayload(payload: Record<string, any>, schema: Record<string, any>): Promise<R>;
    }
  }
}

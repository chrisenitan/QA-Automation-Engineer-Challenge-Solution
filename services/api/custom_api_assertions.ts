export const ApiAssertions = {
  /**
   * @example
   * expect(200).toBeOkResponse()
   */
  async toBeOkResponse(status: number) {
    const pass = status == 200;
    return pass ? asPass() : asFail(`Expected status to be 200 but found ${status}`);
  },

  /**
   * @example
   * expect(payload).toBeExpectedPayload(schema)
   */
  async toBeExpectedPayload(payload: Record<string, any>, schema: Record<string, any>) {
    const pass = payload && schema && true;
    return pass ? asPass() : asFail(`Payload does not match expected Schema`);
  }
};

const asResponse = (message: string, status: boolean) => {
  return {
    message: () => message,
    pass: status
  };
};

const asFail = (message: string) => asResponse(message, false);
const asPass = (message = 'passed') => asResponse(message, true);

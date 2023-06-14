// Eslint rule disabled to allow us to export this helper function for all invalid API key tests
/* eslint-disable jest/no-export */
export function invalidApiKeyTest<T>(handleFetch: () => Promise<T>, RESPONSE = 'Unauthorized') {
  it(`Should throw a "${RESPONSE}" error when invalid API Key is used`, async () => {
    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow(RESPONSE);
  });
}

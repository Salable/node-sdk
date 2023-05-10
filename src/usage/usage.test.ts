import Usage from './index';

// TODO: Add integration testing for success and error responses
describe('Unit | ThirdPartyAPI | Usage', () => {
  it('should update the usage record via API', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ json: () => null, status: 200 });

    global.fetch = mockFetch;

    const api = new Usage('test-key');
    await api.update('license-id', 'feature-name', {
      increment: 2,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});

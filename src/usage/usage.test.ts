import Usage from './index';
import fetch from 'jest-fetch-mock';

const api = new Usage('test-key');
fetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse('');
});

describe('Unit | ThirdPartyAPI | Usage', () => {
  it('should update the usage record via API', async () => {
    const updateUsage = await api.update('license-id', 'feature-name', {
      increment: 2,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(updateUsage).toStrictEqual('');
  });
  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.update('license-id', 'feature-name', {
        increment: 2,
      });
    }).rejects.toBe('API is down');
  });
});

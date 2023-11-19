import Usage from './index';
import fetch from 'jest-fetch-mock';

fetch.enableMocks();
const mockResponse = '';
const api = new Usage('test-key');

describe('Unit | ThirdPartyAPI | Usage', () => {
  it('should update the usage record via API', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    await api.update('license-id', 'feature-name', {
      increment: 2,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
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

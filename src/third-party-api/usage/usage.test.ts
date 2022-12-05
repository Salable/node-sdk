import fetch from 'jest-fetch-mock';
import Usage from './index';

const api = new Usage('test-key');

fetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

// TODO: Add integration testing for success and error responses
describe('Usage Unit Tests', () => {
  it('update usage', async () => {
    fetch.mockResponseOnce(JSON.stringify(''), {
      status: 200,
    });
    const usage = await api.updateUsage('license-id', 'feature-name', {
      increment: 2,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

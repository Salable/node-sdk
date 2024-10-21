import { initRequest } from '.';
import { SalableResponseError, SalableValidationError } from './exceptions/salable-error';

global.fetch = jest.fn();

describe('initRequest', () => {
  const apiKey = 'test-api-key';
  const version = 'v2';
  const input = 'https://api.example.com/data';
  const init = { method: 'GET' };
  const mockFetch = global.fetch as jest.Mock;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should return data on successful fetch', async () => {
    const mockData = { key: 'value' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockData,
    });

    const request = initRequest(apiKey, version);
    const data = await request(input, init);

    expect(data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(input, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, version },
    });
  });

  it('should throw an error on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Network error'));

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow('Unable to complete fetch operation');
  });

  it('should throw an error on invalid JSON response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('Invalid JSON');
      },
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow('Unable to parse data');
  });

  it('should throw an error on bad request (400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableValidationError);
  });

  it('should throw an error on unauthenticated (401)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });

  it('should throw an error on unauthorized (403)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });

  it('should throw an error on internal server error (500)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });
});

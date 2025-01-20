import { initRequest } from '.';
import { SalableParseError, SalableRequestError, SalableResponseError, SalableValidationError } from './exceptions/salable-error';

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
      headers: {
        get: () => '10',
      },
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

  it('should return undefined if content-length is 0', async () => {
    const mockData = { key: 'value' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      headers: {
        get: () => '0',
      },
      json: async () => mockData,
    });

    const request = initRequest(apiKey, version);
    const data = await request(input, init);

    expect(data).toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(input, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, version },
    });
  });

  it('should throw an error on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Network error'));

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableRequestError);
  });

  it('should throw an error on invalid JSON response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: {
        get: () => '10',
      },
      json: async () => {
        throw new SyntaxError('Invalid JSON');
      },
    });

    const request = initRequest(apiKey, version);

      await expect(request(input, init)).rejects.toThrow(SalableParseError);

  });

  it('should throw an error on bad request (400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: {
        get: () => '10',
      },
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableValidationError);
  });

  it('should throw an error on bad request (404)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      headers: {
        get: () => '10',
      },
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });

  it('should throw an error on unauthenticated (401)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      headers: {
        get: () => '10',
      },
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });

  it('should throw an error on unauthorized (403)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      headers: {
        get: () => '10',
      },
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });

  it('should throw an error on internal server error (500)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      headers: {
        get: () => '10',
      },
      json: async () => ({}),
    });

    const request = initRequest(apiKey, version);

    await expect(request(input, init)).rejects.toThrow(SalableResponseError);
  });
});

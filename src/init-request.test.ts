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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableRequestError);
    await expect(result).rejects.toMatchObject({
      code: 'S1008'
    });
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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableParseError);
    await expect(result).rejects.toMatchObject({
      code: 'S1007'
    });
  });

  it('should throw an error on bad request (400)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: {
        get: () => '10',
      },
      json: async () => ({
        error: 'A known bad request message from the salable api'
      }),
    });
    const request = initRequest(apiKey, version);
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableValidationError);
    await expect(result).rejects.toMatchObject({
      code: 'S1004',
      data: {
        error: 'A known bad request message from the salable api'
      }
    });
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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableResponseError);
    await expect(result).rejects.toMatchObject({
      code: 'S1002'
    });
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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableResponseError);
    await expect(result).rejects.toMatchObject({
      code: 'S1001'
    });
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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableResponseError);
    await expect(result).rejects.toMatchObject({
      code: 'S1000'
    });
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
    const result = request(input, init)

    await expect(result).rejects.toThrow(SalableResponseError);
    await expect(result).rejects.toMatchObject({
      code: 'S1005'
    });
  });
});

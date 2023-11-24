import fetch from 'jest-fetch-mock';
import Licenses from '@/src/licenses';
import {
  SalableResponseError,
  SalableUnknownError,
  SalableValidationError,
} from '@/src/exceptions/salable-error';

const api = new Licenses('test-key');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | Base functionality', () => {
  describe('Success Cases', () => {
    it('Successfully return response with a body', async () => {
      fetch.mockResponse(JSON.stringify(mockResponse), {
        headers: { 'Content-Type': 'application/json' },
      });
      const response = await api.getAll();
      expect(response).toStrictEqual(mockResponse);
    });
    it('Successfully return response with an empty body', async () => {
      fetch.mockResponse('', {
        headers: { 'Content-Type': 'text/plain' },
      });
      const response = await api.getAll();
      expect(response).toStrictEqual('');
    });
  });

  describe('Failure Cases', () => {
    it('Bad request error', async () => {
      fetch.mockResponse(JSON.stringify(mockResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
      await expect(api.getAll()).rejects.toThrow(SalableResponseError);
    });

    it('Not found request error with a body in response', async () => {
      fetch.mockResponse(JSON.stringify(mockResponse), {
        status: 404,
        headers: { 'Content-Type': 'plain/text' },
      });
      await expect(api.getAll()).rejects.toThrow(SalableResponseError);
    });

    it('Not found request error with an empty body response', async () => {
      fetch.mockResponse('', {
        status: 404,
        headers: { 'Content-Type': 'plain/text' },
      });
      await expect(api.getAll()).rejects.toThrow(SalableResponseError);
    });

    it('Validation error', async () => {
      fetch.mockResponse(JSON.stringify({ validationErrors: [] }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
      await expect(api.getAll()).rejects.toThrow(SalableValidationError);
    });

    it('Unknown error', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockImplementation(
          jest.fn(() => Promise.resolve({ json: () => Promise.reject('Error') })) as jest.Mock
        );
      await expect(api.getAll()).rejects.toThrow(SalableUnknownError);
    });
  });
});

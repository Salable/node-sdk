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
  describe('Failure Cases', () => {
    it('Bad request error', async () => {
      fetch.mockResponse(JSON.stringify(mockResponse), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
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

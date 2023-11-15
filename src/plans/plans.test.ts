import fetch from 'jest-fetch-mock';
import { BaseRequest } from '@/src/base';
import Plans from './index';

const api = new Plans('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = {
  mockProperty: 'example',
};

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | ThirdPartyAPI | Plans', () => {
  it('Get a plan: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedPlan = await api.getOne('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx');
  });

  it('Get a checkout link: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedCheckoutLink = await api.getCheckoutLink('xxxxx', {
      granteeId: 'userId_1',
      member: 'orgId_1',
      successUrl: 'successUrl',
      cancelUrl: 'cancelUrl',
    });
    expect(fetchedCheckoutLink).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      `plans/xxxxx/checkoutlink?granteeId=userId_1&member=orgId_1&successUrl=successUrl&cancelUrl=cancelUrl`
    );
  });

  it('Get features: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedPlan = await api.getFeatures('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx/features');
  });

  it('Get capabilities: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedPlan = await api.getCapabilities('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx/capabilities');
  });

  it('Get currencies: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedPlan = await api.getCurrencies('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx/currencies');
  });

  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.getOne('xxxxx');
    }).rejects.toBe('API is down');
  });
});

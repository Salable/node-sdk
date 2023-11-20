import fetch from 'jest-fetch-mock';
import Subscriptions from './index';
import { BaseRequest } from '../base';

const api = new Subscriptions('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | ThirdPartyAPI | Subscriptions', () => {
  it('Get a subscription: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.getOne('xxxxx');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx');
  });

  it("Update a subscription's plan: should return the response unchanged", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.updatePlan('aaaaa', 'xxxxx');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/updateplan/aaaaa', {
      method: 'PUT',
    });
  });

  it("Change a subscription's plan: should return the response unchanged", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.changePlan('xxxxx', {
      planUuid: 'aaaaa',
      proration: 'invoice',
    });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/change-plan', {
      method: 'PUT',
      body: {
        planUuid: 'aaaaa',
        proration: 'invoice',
      },
    });
  });

  it('Cancel a subscription: should call the endpoint with correct parameters', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.cancel('xxxxx', 'end');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/cancel?when=end', {
      method: 'PUT',
    });
  });

  it('Add seats to a subscription: should call the endpoint with correct body and return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.addSeats('xxxxx', { increment: 5 });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/seats', {
      method: 'POST',
      body: { increment: 5 },
    });
  });

  it('Remove seats from a subscription: should call the endpoint with correct body and return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedSubscription = await api.removeSeats('xxxxx', { decrement: 5 });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/seats', {
      method: 'PUT',
      body: { decrement: 5 },
    });
  });

  it('should return an error if subscription plan could not be changed', async () => {
    fetch.mockReject(() => Promise.reject('Subscription failed to change'));

    await expect(async () => {
      await api.updatePlan('test-sub-id', 'test-new-plan-id');
    }).rejects.toBe('Subscription failed to change');
  });

  // TODO: Discuss what will be returned from change plan endpoint so test can be mocked
});

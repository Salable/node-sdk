import fetch from 'jest-fetch-mock';
import { ISubscription } from '../types';
import Subscriptions from './index';

const api = new Subscriptions('test-key');

fetch.enableMocks();

const subscription: ISubscription = {
  uuid: 'test-id',
  paymentIntegrationSubscriptionId: 'payment-int-id',
  productUuid: 'product-id',
  type: 'stripe',
  email: 'test@gmail.com',
  organisation: 'test-org',
  status: 'ACTIVE',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  expiryDate: new Date().toString(),
  licenseUuid: 'test-license-id',
  planUuid: 'test-plan-id',
};

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | ThirdPartyAPI | Subscriptions', () => {
  it('should get one subscription record', async () => {
    fetch.mockResponseOnce(JSON.stringify(subscription));
    const fetchedSubscription = await api.getOne('test-id');
    expect(fetchedSubscription?.uuid).toBe('test-id');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return an error if subscription plan could not be changed', async () => {
    fetch.mockReject(() => Promise.reject('Subscription failed to change'));

    await expect(async () => {
      await api.updatePlan('test-sub-id', 'test-new-plan-id');
    }).rejects.toBe('Subscription failed to change');
  });

  // TODO: Discuss what will be returned from change plan endpoint so test can be mocked
});

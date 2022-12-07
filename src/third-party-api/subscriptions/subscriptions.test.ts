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

describe('Subscriptions Unit Tests', () => {
  it('gets one subscription by uuid', async () => {
    fetch.mockResponseOnce(JSON.stringify(subscription));
    const fetchedSubscription = await api.getSubscription('test-id');
    expect(fetchedSubscription.uuid).toBe('test-id');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // TODO: Discuss what will be returned from change plan endpoint so test can be mocked
});

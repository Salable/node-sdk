import fetch from 'jest-fetch-mock';
import Subscriptions from './index';
import { BaseRequest } from '../base';

const api = new Subscriptions('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(mockResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
});

describe('Unit | ThirdPartyAPI | Subscriptions', () => {
  it('Get a subscription: should return the response unchanged', async () => {
    const fetchedSubscription = await api.getOne('xxxxx');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx');
  });

  it('Get all subscriptions: with no parameters set it should return the response unchanged', async () => {
    const fetchedSubscription = await api.getAll();
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions');
  });

  it('Get all subscriptions: with all parameters set it should return the response unchanged', async () => {
    const fetchedSubscription = await api.getAll({
      cursor: 'xxxxx',
      take: 25,
      email: 'test@example.com',
      status: 'active',
    });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      'subscriptions?take=25&cursor=xxxxx&email=test@example.com&status=active'
    );
  });

  it("Change a subscription's plan: should return the response unchanged", async () => {
    const fetchedSubscription = await api.changePlan('xxxxx', {
      planUuid: 'aaaaa',
      proration: 'always_invoice',
    });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/change-plan', {
      method: 'PUT',
      body: {
        planUuid: 'aaaaa',
        proration: 'always_invoice',
      },
    });
  });

  it('Cancel a subscription: should call the endpoint with correct parameters', async () => {
    const fetchedSubscription = await api.cancel('xxxxx', 'end');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/cancel?when=end', {
      method: 'PUT',
    });
  });

  it('Add seats to a subscription: should call the endpoint with correct body and return the response unchanged', async () => {
    const fetchedSubscription = await api.addSeats('xxxxx', { increment: 5 });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/seats', {
      method: 'POST',
      body: { increment: 5 },
    });
  });

  it('Remove seats from a subscription: should call the endpoint with correct body and return the response unchanged', async () => {
    const fetchedSubscription = await api.removeSeats('xxxxx', { decrement: 5 });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/seats', {
      method: 'PUT',
      body: { decrement: 5 },
    });
  });

  it('Get all invoices for a subscription: should call the endpoint with no parameters set and return the response unchanged', async () => {
    const fetchedSubscription = await api.getInvoices('xxxxx');
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/invoices');
  });

  it('Get all invoices for a subscription: should call the endpoint with all parameters set and return the response unchanged', async () => {
    const fetchedSubscription = await api.getInvoices('xxxxx', {
      cursor: 'aaaaa',
      take: 25,
    });
    expect(fetchedSubscription).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('subscriptions/xxxxx/invoices?take=25&cursor=aaaaa');
  });

  // TODO: Discuss what will be returned from change plan endpoint so test can be mocked
});

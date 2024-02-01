import fetch from 'jest-fetch-mock';
import { BaseRequest } from '../base';
import Plans from './index';

const api = new Plans('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(mockResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
});

describe('Unit | ThirdPartyAPI | Plans', () => {
  it('Get a plan: should return the response unchanged', async () => {
    const fetchedPlan = await api.getOne('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx');
  });

  it('Get a checkout link: should return the response unchanged', async () => {
    const fetchedCheckoutLink = await api.getCheckoutLink('xxxxx', {
      granteeId: 'userId_1',
      member: 'orgId_1',
      successUrl: 'successUrl',
      cancelUrl: 'cancelUrl',
      couponCode: 'SALE50',
      promoCode: 'SALE50',
      customMessage: 'Custom Message',
      allowPromoCode: 'true',
      marketingConsent: 'true',
      currency: 'GBP',
      quantity: 10,
      vat: {
        companyName: 'Company',
        city: 'City',
        number: '10',
        postcode: 'NR1 1RN',
        state: 'State',
        street: 'Street',
        country: 'GB',
      },
      customer: {
        email: 'customer@email.com',
        postcode: 'NR1 1RN',
        country: 'GB',
      },
    });
    expect(fetchedCheckoutLink).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      `plans/xxxxx/checkoutlink?granteeId=userId_1&member=orgId_1&successUrl=successUrl&cancelUrl=cancelUrl&quantity=10&marketingConsent=true&couponCode=SALE50&promoCode=SALE50&allowPromoCode=true&customMessage=Custom+Message&currency=GBP&customerEmail=customer%40email.com&customerCountry=GB&customerPostcode=NR1+1RN&vatCompanyName=Company&vatCity=City&vatNumber=10&vatPostcode=NR1+1RN&vatState=State&vatStreet=Street&vatCountry=GB`
    );
  });

  it('Get features: should return the response unchanged', async () => {
    const fetchedPlan = await api.getFeatures('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx/features');
  });

  it('Get capabilities: should return the response unchanged', async () => {
    const fetchedPlan = await api.getCapabilities('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('plans/xxxxx/capabilities');
  });

  it('Get currencies: should return the response unchanged', async () => {
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

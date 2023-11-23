import fetch from 'jest-fetch-mock';
import { BaseRequest } from '../base';
import Products from './index';

const api = new Products('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(mockResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
});

describe('Unit | ThirdPartyAPI | Products', () => {
  it('Get all products: should return the response unchanged', async () => {
    const fetchedPlan = await api.getAll();
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('products');
  });

  it('Get one product: should return the response unchanged', async () => {
    const fetchedPlan = await api.getOne('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('products/xxxxx');
  });

  it('Get product plans: should return the response unchanged', async () => {
    const fetchedPlan = await api.getPlans('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('products/xxxxx/plans');
  });

  it('Get product currencies: should return the response unchanged', async () => {
    const fetchedPlan = await api.getCurrencies('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('products/xxxxx/currencies');
  });

  it('Get product capabilities: should return the response unchanged', async () => {
    const fetchedPlan = await api.getCapabilities('xxxxx');
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('products/xxxxx/capabilities');
  });

  it('Get product basic pricing table: should set the global and individual plan options correctly and return the response unchanged', async () => {
    const fetchedPlan = await api.getPricingTable('xxxxx', {
      globalPlanOptions: {
        successUrl: 'aaaaa',
        cancelUrl: 'aaaaa',
        contactUsLink: 'aaaaa',
        granteeId: 'userId_1',
        member: 'orgId_1',
        couponCode: 'SALE50',
        promoCode: 'SALE50',
        customMessage: 'Custom Message',
        allowPromoCode: 'true',
        marketingConsent: 'true',
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
      },
      individualPlanOptions: {
        planUuid123: {
          successUrl: 'bbbbb',
          cancelUrl: 'bbbbb',
          granteeId: 'userId_2',
        },
      },
    });
    expect(fetchedPlan).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      'products/xxxxx/pricingtable?&globalGranteeId=userId_1&globalSuccessUrl=aaaaa&globalCancelUrl=aaaaa&contactUsLink=aaaaa&member=orgId_1&marketingConsent=true&couponCode=SALE50&promoCode=SALE50&allowPromoCode=true&customMessage=Custom%20Message&customerEmail=customer@email.com&customerCountry=GB&customerPostcode=NR1%201RN&vatCompanyName=Company&vatCity=City&vatNumber=10&vatPostcode=NR1%201RN&vatState=State&vatStreet=Street&vatCountry=GB&granteeIds=planUuid123,userId_2&cancelUrls=planUuid123,bbbbb&successUrls=planUuid123,bbbbb'
    );
  });

  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.getOne('xxxxx');
    }).rejects.toBe('API is down');
  });
});

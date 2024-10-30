import objectBuilder from './object-builder';

export const mockCurrency = objectBuilder({
  shortName: 'XXX',
  longName: 'Mock Currency',
  symbol: '@',
});

export const mockProductCurrency = objectBuilder({
  defaultCurrency: true,
});

export const mockPlanCurrency = objectBuilder({
  price: 700,
  paymentIntegrationPlanId: 'test-payment-integration-id',
});

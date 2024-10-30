import objectBuilder from './object-builder';

export const mockPlan = objectBuilder({
  name: 'Test Free Plan',
  description: 'Test Free Plan description',
  displayName: 'Test Free Plan Display Name',
  slug: 'example-slug',
  status: 'ACTIVE',
  trialDays: 7,
  evaluation: false,
  evalDays: 14,
  organisation: 'xxxxx',
  visibility: 'public',
  licenseType: 'licensed',
  interval: 'month',
  perSeatAmount: 1,
  maxSeatAmount: -1,
  length: 1,
  active: true,
  planType: 'Standard',
  pricingType: 'free',
  environment: 'dev',
  paddlePlanId: null, // Note: deprecated
  isTest: false,
  hasAcceptedTransaction: false,
});

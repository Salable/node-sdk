import objectBuilder from './object-builder';

export const mockPlan = objectBuilder({
  name: 'Free Plan Name',
  description: 'Free Plan description',
  displayName: 'Free Plan Display Name',
  slug: 'example-slug',
  status: 'ACTIVE',
  trialDays: 0,
  evaluation: false,
  evalDays: 0,
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
  archivedAt: null as Date | null,
});

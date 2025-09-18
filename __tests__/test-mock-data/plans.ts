import objectBuilder from './object-builder';

export const mockPlan = objectBuilder({
  name: 'Free Plan Name', // deprecated
  description: 'Free Plan description',
  displayName: 'Free Plan Display Name',
  slug: 'example-slug',
  status: 'ACTIVE',
  trialDays: 0, // deprecated
  evaluation: false, // deprecated
  evalDays: 0,
  organisation: 'xxxxx',
  visibility: 'public',
  licenseType: 'licensed',
  interval: 'month',
  perSeatAmount: 1,
  maxSeatAmount: -1,
  length: 1,
  active: true, // deprecated
  planType: 'Standard', // deprecated
  pricingType: 'free',
  environment: 'dev', // deprecated
  paddlePlanId: null, // deprecated
  isTest: false,
  hasAcceptedTransaction: false,
  archivedAt: null as Date | null,
});

const organisation = 'org_12345';

export const productData = {
  organisation,
  name: 'Product 1',
  displayName: 'Product',
  description: null,
  logoUrl: null,
  status: 'ACTIVE',
  paid: false,
  updatedAt: new Date(),
};

export const planData = {
  name: 'example-plan',
  organisation,
  displayName: 'Example Plan',
  visibility: 'public',
  status: 'ACTIVE',
  environment: 'test',
  active: true,
  planType: 'basic',
  currencies: {},
  interval: 'year',
  length: 3,
  evaluation: false,
  pricingType: 'free',
  evalDays: 10,
  licenseType: 'test',
};

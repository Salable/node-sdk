export const SALABLE_BASE_URL = process.env.SALABLE_BASE_URL;

export const RESOURCE_NAMES = {
  LICENSES: 'licenses',
  SUBSCRIPTIONS: 'subscriptions',
  PLANS: 'plans',
  PRICING_TABLES: 'pricing-tables',
  PRODUCTS: 'products',
  USAGE: 'usage',
  RBAC: {
    PERMISSIONS: 'rbac/permissions',
    ROLES: 'rbac/roles',
    USERS: 'rbac/users',
  },
};

export const allowedPlanCheckoutParams = [
  'successUrl',
  'cancelUrl',
  'granteeId',
  'member',
  'customerCountry',
  'customerEmail',
  'customerPostcode',
  'couponCode',
  'promoCode',
  'allowPromoCode',
  'marketingConsent',
  'vatCity',
  'vatCompanyName',
  'vatCountry',
  'vatNumber',
  'vatPostcode',
  'vatState',
  'vatStreet',
  'customMessage',
];

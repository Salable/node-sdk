export const SALABLE_BASE_URL = process.env.SALABLE_BASE_URL;
export const SALABLE_API_KEY = process.env.SALABLE_API_KEY;

// Test ENVs
export const EMPTY_PRODUCT_UUID = process.env.EMPTY_PRODUCT_UUID;
export const POPULATED_PRODUCT_UUID = process.env.POPULATED_PRODUCT_UUID;
export const POPULATED_PLAN_UUID = process.env.POPULATED_PLAN_UUID;
export const INVALID_PLAN_UUID = process.env.INVALID_PLAN_UUID;
export const MEMBER_ID = 'test@example.com';
export const GRANTEE_ID = 'GRANTEE_ID';
export const POPULATED_PRODUCT_CAPABILITY = [
  {
    uuid: 'cadcbdc0-774a-46d5-8d69-1c40ae7dec63',
    name: 'Capability',
    description: null,
    status: 'ACTIVE',
    productUuid: '8d0e663f-6e1d-4afb-995c-5074077fb765',
    updatedAt: '2023-06-07T15:29:27.636Z',
  },
];

export const RESOURCE_NAMES = {
  LICENSES: 'licenses',
  SUBSCRIPTIONS: 'subscriptions',
  PLANS: 'plans',
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

export const allowed = [
  {
    key: 'successUrl',
    required: true,
  },
  {
    key: 'cancelUrl',
    required: true,
  },
  {
    key: 'granteeId',
    required: true,
  },
  {
    key: 'member',
    required: true,
  },
];

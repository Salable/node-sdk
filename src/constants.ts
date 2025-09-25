import dotenv from 'dotenv';

dotenv.config();

export const SALABLE_BASE_URL = process.env.SALABLE_BASE_URL;

export const RESOURCE_NAMES = {
  LICENSES: 'licenses',
  SUBSCRIPTIONS: 'subscriptions',
  PLANS: 'plans',
  PRICING_TABLES: 'pricing-tables',
  PRODUCTS: 'products',
  USAGE: 'usage',
  FEATURES: 'features',
  ENTITLEMENTS: 'entitlements',
  RBAC: {
    PERMISSIONS: 'rbac/permissions',
    ROLES: 'rbac/roles',
    USERS: 'rbac/users',
  },
};

import {
  FeatureEnumOption,
  FeatureV3,
  Invoice,
  LicenseV3,
  OrganisationPaymentIntegrationV3,
  PaginatedLicenses,
  PaginatedSubscription,
  PaginatedSubscriptionInvoice,
  PlanCurrency,
  PlanFeatureV3,
  PlanV3,
  PricingTableV3,
  ProductCurrency,
  ProductPricingTableV3,
  ProductV3,
  Subscription,
} from '../../types';
import { EnumValueSchema, LicenseSchema, SubscriptionSchema } from '../v2/schemas-v2';

export const ProductSchemaV3: ProductV3 = {
  uuid: expect.any(String),
  slug: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  logoUrl: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.toBeOneOf([expect.any(String), null]),
  organisation: expect.any(String),
  status: expect.any(String),
  paid: expect.any(Boolean),
  isTest: expect.any(Boolean),
  organisationPaymentIntegrationUuid: expect.any(String),
  paymentIntegrationProductId: expect.toBeOneOf([expect.any(String), null]),
  updatedAt: expect.any(String),
  archivedAt: expect.toBeOneOf([expect.any(String), null]),
};

export const PlanSchemaV3: PlanV3 = {
  uuid: expect.any(String),
  slug: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  status: expect.any(String),
  evalDays: expect.any(Number),
  perSeatAmount: expect.any(Number),
  maxSeatAmount: expect.any(Number),
  organisation: expect.any(String),
  visibility: expect.any(String),
  licenseType: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
  interval: expect.any(String),
  length: expect.any(Number),
  pricingType: expect.any(String),
  isTest: expect.any(Boolean),
  productUuid: expect.any(String),
  updatedAt: expect.any(String),
  archivedAt: expect.toBeOneOf([expect.any(String), null]),
  isSubscribed: expect.toBeOneOf([expect.any(Boolean), undefined]),
};

export const FeatureSchemaV3: FeatureV3 & {
  featureEnumOptions: FeatureEnumOption[]
} = {
  defaultValue: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  productUuid: expect.any(String),
  showUnlimited: expect.any(Boolean),
  sortOrder: expect.any(Number),
  status: expect.any(String),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
  valueType: expect.any(String),
  variableName: expect.any(String),
  visibility: expect.any(String),
  featureEnumOptions: expect.arrayContaining([EnumValueSchema]) as FeatureEnumOption[]
};

export const PlanFeatureSchemaV3: PlanFeatureV3 = {
  planUuid: expect.any(String),
  featureUuid: expect.any(String),
  value: expect.any(String),
  enumValueUuid: expect.any(String),
  isUnlimited: expect.any(Boolean),
  updatedAt: expect.any(String),
  feature: FeatureSchemaV3,
  enumValue: EnumValueSchema,
};

export const ProductCurrencySchema: ProductCurrency = {
  productUuid: expect.any(String),
  currencyUuid: expect.any(String),
  defaultCurrency: expect.any(Boolean),
  currency: {
    uuid: expect.any(String),
    shortName: expect.any(String),
    longName: expect.any(String),
    symbol: expect.any(String),
  },
};

export const PlanCurrencySchema: PlanCurrency = {
  planUuid: expect.any(String),
  currencyUuid: expect.any(String),
  paymentIntegrationPlanId: expect.any(String),
  price: expect.any(Number),
  hasAcceptedTransaction: expect.any(Boolean),
  currency: {
    uuid: expect.any(String),
    shortName: expect.any(String),
    longName: expect.any(String),
    symbol: expect.any(String),
  },
};

export const ProductPricingTableSchemaV3: ProductPricingTableV3 = {
  ...ProductSchemaV3,
  features: expect.arrayContaining([FeatureSchemaV3]),
  currencies: expect.arrayContaining([ProductCurrencySchema]),
  plans: expect.arrayContaining([
    {
      ...PlanSchemaV3,
      features: expect.arrayContaining([PlanFeatureSchemaV3]),
      currencies: expect.arrayContaining([PlanCurrencySchema]),
    },
  ]),
  status: expect.any(String),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
};

export const OrganisationPaymentIntegrationSchemaV3: OrganisationPaymentIntegrationV3 = {
  uuid: expect.any(String),
  organisation: expect.any(String),
  integrationName: expect.any(String),
  accountName: expect.any(String),
  accountId: expect.any(String),
  updatedAt: expect.any(String),
  isTest: expect.any(Boolean),
  newPaymentEnabled: expect.any(Boolean),
  status: expect.any(String),
};

export const LicenseSchemaV3: LicenseV3 = {
  uuid: expect.any(String),
  subscriptionUuid: expect.any(String),
  status: expect.toBeOneOf(['ACTIVE', 'CANCELED', 'EVALUATION', 'SCHEDULED', 'TRIALING', 'INACTIVE']),
  granteeId: expect.toBeOneOf([expect.any(String), null]),
  paymentService: expect.toBeOneOf(['ad-hoc', 'salable', 'stripe_existing']),
  purchaser: expect.any(String),
  type: expect.toBeOneOf(['licensed', 'metered', 'perSeat']),
  productUuid: expect.any(String),
  planUuid: expect.any(String),
  startTime: expect.any(String),
  endTime: expect.any(String),
  updatedAt: expect.any(String),
  isTest: expect.any(Boolean),
};

export const PaginatedLicensesSchemaV3: PaginatedLicenses = {
  first: expect.toBeOneOf([expect.any(String), null]),
  last: expect.toBeOneOf([expect.any(String), null]),
  data: expect.arrayContaining([LicenseSchemaV3]),
};

export const PricingTableSchemaV3: PricingTableV3 = {
  productUuid: expect.any(String),
  featuredPlanUuid: expect.toBeOneOf([expect.any(String), null]),
  status: expect.any(String),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
  featureOrder: expect.any(String),
  product: {
    ...ProductSchemaV3,
    features: expect.arrayContaining([FeatureSchemaV3]),
    currencies: expect.arrayContaining([ProductCurrencySchema]),
  },
  plans: expect.arrayContaining([
    {
      planUuid: expect.any(String),
      pricingTableUuid: expect.any(String),
      sortOrder: expect.any(Number),
      updatedAt: expect.any(String),
      plan: {
        ...PlanSchemaV3,
        features: expect.arrayContaining([PlanFeatureSchemaV3]),
        currencies: expect.arrayContaining([PlanCurrencySchema]),
      },
    },
  ]),
};
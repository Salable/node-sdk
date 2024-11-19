import Salable, { Version } from '../..';
import { Plan, Product, ProductCapability, ProductCurrency, ProductFeature, ProductPricingTable } from '../../types';

describe('Products V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  const productUuid = global.db.productUuid;

  it('getAll: should successfully fetch all products', async () => {
    const data = await salable.products.getAll();

    expect(data).toEqual(expect.arrayContaining([ProductSchema]));
  });
  it('getOne: should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid);

    expect(data).toEqual(ProductSchema);
  });

  it('getOne (w / search params): should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid, {
      expand: ['features', 'features.featureEnumOptions', 'capabilities', 'currencies', 'currencies.currency', 'organisationPaymentIntegration', 'plans', 'plans.capabilities', 'plans.features', 'plans.features.feature', 'plans.features.enumValue', 'plans.currencies', 'plans.currencies.currency'],
    });

    expect(data).toEqual({
      ...ProductSchema,
      features: expect.toBeOneOf([expect.anything()]),
      capabilities: expect.toBeOneOf([expect.anything()]),
      currencies: expect.toBeOneOf([expect.anything()]),
      organisationPaymentIntegration: expect.toBeOneOf([expect.anything()]),
      plans: expect.toBeOneOf([expect.anything()]),
    });
  });

  it('getPricingTable: should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid);

    expect(data).toEqual(ProductPricingTableSchema);
  });

  it('getPricingTable (w / search params): should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid, {
      granteeId: 'granteeid@email.com',
      currency: 'GBP',
    });

    expect(data).toEqual(ProductPricingTableSchema);
  });

  it('getPlans: should successfully fetch a product plans', async () => {
    const data = await salable.products.getPlans(productUuid);

    expect(data).toEqual(expect.arrayContaining([ProductPlanSchema]));
  });

  it('getFeatures: should successfully fetch a product features', async () => {
    const data = await salable.products.getFeatures(productUuid);

    expect(data).toEqual(expect.arrayContaining([ProductFeatureSchema]));
  });

  it('getCapabilities: should successfully fetch a product capabilities', async () => {
    const data = await salable.products.getCapabilities(productUuid);

    expect(data).toEqual(expect.arrayContaining([ProductCapabilitySchema]));
  });

  it('getCurrencies: should successfully fetch a product currencies', async () => {
    const data = await salable.products.getCurrencies(productUuid);

    expect(data).toEqual(expect.arrayContaining([ProductCurrencySchema]));
  });
});

const ProductSchema: Product = {
  uuid: expect.any(String),
  name: expect.any(String),
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
  appType: expect.any(String),
  updatedAt: expect.any(String),
};

const ProductPricingTableSchema: ProductPricingTable = {
  ...ProductSchema,
  features: expect.toBeOneOf([expect.anything(), undefined]),
  currencies: expect.toBeOneOf([expect.anything(), undefined]),
  plans: expect.toBeOneOf([expect.anything(), undefined]),
  status: expect.any(String),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
};
const ProductPlanSchema: Plan = {
  uuid: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  status: expect.any(String),
  trialDays: expect.toBeOneOf([expect.any(Number), null]),
  evaluation: expect.any(Boolean),
  evalDays: expect.any(Number),
  perSeatAmount: expect.any(Number),
  maxSeatAmount: expect.any(Number),
  organisation: expect.any(String),
  visibility: expect.any(String),
  licenseType: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
  interval: expect.any(String),
  length: expect.any(Number),
  active: expect.any(Boolean),
  planType: expect.any(String),
  pricingType: expect.any(String),
  environment: expect.any(String),
  isTest: expect.any(Boolean),
  paddlePlanId: expect.toBeOneOf([expect.any(String), null]),
  productUuid: expect.any(String),
  salablePlan: expect.any(Boolean),
  type: expect.toBeOneOf([expect.any(String), undefined]),
  updatedAt: expect.any(String),
  features: expect.toBeOneOf([expect.anything(), undefined]),
};

const ProductFeatureSchema: ProductFeature = {
  defaultValue: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  featureEnumOptions: expect.toBeOneOf([expect.anything()]),
  name: expect.any(String),
  productUuid: expect.any(String),
  showUnlimited: expect.any(Boolean),
  sortOrder: expect.any(Number),
  status: expect.any(String),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
  valueType: expect.any(String),
  variableName: expect.any(String),
  visibility: expect.any(String),
};

const ProductCapabilitySchema: ProductCapability = {
  uuid: expect.any(String),
  name: expect.any(String),
  description: expect.any(String),
  status: expect.any(String),
  productUuid: expect.any(String),
  updatedAt: expect.any(String),
};

const ProductCurrencySchema: ProductCurrency = {
  productUuid: expect.any(String),
  currencyUuid: expect.any(String),
  defaultCurrency: expect.any(Boolean),
  currency: expect.toBeOneOf([expect.anything()]),
};

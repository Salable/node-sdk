import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { initSalable } from '../../index';
import { ProductCapabilitySchema, ProductCurrencySchema, ProductFeatureSchema, ProductPlanSchema, ProductPricingTableSchema, ProductSchema } from '../../schemas/v2/schemas-v2';

describe('Products V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v2');

  const productUuid = testUuids.productUuid;

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

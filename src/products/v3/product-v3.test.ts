import Salable from '../..';
import { Version } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import {
  EnumValueSchema,
  FeatureSchemaV3,
  PlanFeatureSchemaV3,
  OrganisationPaymentIntegrationSchemaV3,
  PlanCurrencySchema,
  PlanSchemaV3,
  ProductCurrencySchema,
  ProductPricingTableSchemaV3,
  ProductSchemaV3
} from '../../schemas/v3/schemas-v3';

describe('Products V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const version = Version.V3;
  const salable = new Salable(apiKey, version);
  const productUuid = testUuids.productUuid;

  it('getAll: should successfully fetch all products', async () => {
    const data = await salable.products.getAll();
    expect(data).toEqual(expect.arrayContaining([ProductSchemaV3]));
  });
  it('getOne: should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid);
    expect(data).toEqual(ProductSchemaV3);
  });

  it('getOne (w / search params): should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid, {
      expand: ['features', 'plans', 'currencies', 'organisationPaymentIntegration'],
    });
    expect(data).toEqual({
      ...ProductSchemaV3,
      currencies: expect.arrayContaining([ProductCurrencySchema]),
      features: expect.arrayContaining([{
        ...FeatureSchemaV3,
        featureEnumOptions: expect.arrayContaining([EnumValueSchema])
      }]),
      plans: expect.arrayContaining([{
        ...PlanSchemaV3,
        features: expect.arrayContaining([PlanFeatureSchemaV3]),
        currencies: expect.arrayContaining([PlanCurrencySchema])
      }]),
      organisationPaymentIntegration: OrganisationPaymentIntegrationSchemaV3
    });
  });

  it('getPricingTable: should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid, {owner: 'xxxxx'});
    expect(data).toEqual(ProductPricingTableSchemaV3);
  });

  it('getPricingTable (w / search params): should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid, {
      owner: 'xxxxx',
      currency: 'GBP',
    });
    expect(data).toEqual(ProductPricingTableSchemaV3);
  });
});

import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import {
  OrganisationPaymentIntegrationSchemaV3,
  ProductPricingTableSchemaV3,
  ProductSchemaV3
} from '../../schemas/v3/schemas-v3';
import { initSalable } from '../../index';

describe('Products V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v3');
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
      expand: ['organisationPaymentIntegration'],
    });
    expect(data).toEqual({
      ...ProductSchemaV3,
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
    });
    expect(data).toEqual(ProductPricingTableSchemaV3);
  });
});

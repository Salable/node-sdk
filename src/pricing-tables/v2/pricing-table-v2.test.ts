import { initRequest, Version } from '../..';
import { v2PricingTableMethods } from '.';
import { PricingTableResponse } from '../../types';

describe('Products V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const req = initRequest(apiKey, version);
  const pricingTableV2 = v2PricingTableMethods(req);

  const pricingTableUuid = '28013adc-f132-49c5-89c5-8f8233314f71';

  it('getAll: should successfully fetch all products', async () => {
    const data = await pricingTableV2.getOne(pricingTableUuid);

    expect(data).toEqual(expect.objectContaining(PricingTableSchema));
  });
});

const PricingTableSchema: PricingTableResponse = {
  customTheme: expect.toBeOneOf([expect.any(String), null]),
  productUuid: expect.any(String),
  featuredPlanUuid: expect.toBeOneOf([expect.any(String), null]),
  name: expect.any(String),
  status: expect.any(String),
  theme: expect.any(String),
  text: expect.toBeOneOf([expect.any(String), null]),
  title: expect.toBeOneOf([expect.any(String), null]),
  updatedAt: expect.any(String),
  uuid: expect.any(String),
  featureOrder: expect.any(String),
  features: expect.toBeOneOf([expect.anything(), undefined]),
  product: expect.toBeOneOf([expect.anything(), undefined]),
  plans: expect.toBeOneOf([expect.anything(), undefined]),
};

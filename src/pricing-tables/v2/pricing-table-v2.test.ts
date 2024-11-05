import Salable, { Version } from '../..';
import { PricingTableResponse } from '../../types';

describe('Pricing Table V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  const pricingTableUuid = 'aec06de8-3a3e-46eb-bd09-f1094c1b1b8d';

  it('getAll: should successfully fetch all products', async () => {
    const data = await salable.pricingTables.getOne(pricingTableUuid);

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

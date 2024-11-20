import Salable from '../..';
import { PricingTableResponse, Version } from '../../types';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { TestDbData } from '../../../test-utils/scripts/create-test-data';

const { db: testUuids } = global as unknown as { db: TestDbData; };

const pricingTableUuid = 'aec06de8-3a3e-46eb-bd09-f1094c1b1b8d';
describe('Pricing Table V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  beforeAll(async() => {
    await generateTestData()
  })

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


const generateTestData = async () => {

  const product = await prismaClient.product.findFirst({
    where: { uuid: testUuids.productUuid },
    select: {
      features: true,
      uuid: true,
      plans: true,
    },
  });

  if (!product) return null;

   await prismaClient.pricingTable.create({
     data: {
       uuid: pricingTableUuid,
       name: 'xxxxx',
       product: { connect: { uuid: product.uuid } },
       features: {
         create: product.features.map((f) => ({
           feature: { connect: { uuid: f.uuid } },
           sortOrder: f.sortOrder,
         })),
       },
       featuredPlan: { connect: { uuid: testUuids.paidPlanUuid } },
       plans: {
         create: [{ planUuid: testUuids.paidPlanUuid, sortOrder: 0 }],
       },
     },
     include: {
       features: {
         include: { feature: { include: { featureEnumOptions: true } } },
       },
       plans: {
         include: {
           plan: {
             include: {
               features: { include: { feature: true, enumValue: true } },
               capabilities: { include: { capability: true } },
               currencies: { include: { currency: true } },
             },
           },
         },
       },
       product: {
         include: {
           currencies: true,
           organisationPaymentIntegration: true,
           features: { include: { featureEnumOptions: true } },
         },
       },
     },
   });
}

import { initSalable } from '../..';
import { PricingTable } from '../../types';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';

const pricingTableUuid = randomUUID();
describe('Pricing Table V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v2');

  beforeAll(async() => {
    await generateTestData()
  })

  it('getAll: should successfully fetch all products', async () => {
    const data = await salable.pricingTables.getOne(pricingTableUuid);

    expect(data).toEqual(expect.objectContaining(pricingTableSchema));
  });
});

const pricingTableSchema: PricingTable = {
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

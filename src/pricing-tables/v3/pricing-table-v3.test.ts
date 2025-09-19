import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { PricingTableSchemaV3 } from '../../schemas/v3/schemas-v3';
import { initSalable } from '../../index';
import { randomUUID } from 'crypto';

describe('Pricing Table V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV3;
  const salable = initSalable(apiKey, 'v3');
  const pricingTableUuid = randomUUID();

  beforeAll(async() => {
    await generateTestData(pricingTableUuid)
  })

  it('getOne: should successfully fetch all pricing tables', async () => {
    const data = await salable.pricingTables.getOne(pricingTableUuid, {owner: 'xxxxx'});
    expect(data).toEqual(expect.objectContaining(PricingTableSchemaV3));
  });
});


const generateTestData = async (pricingTableUuid: string) => {

  const product = await prismaClient.product.findUnique({
    where: { uuid: testUuids.productUuid },
    include: {
      features: true,
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

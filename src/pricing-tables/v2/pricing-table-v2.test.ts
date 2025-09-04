import { initSalable } from '../..';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import { PricingTableSchema } from '../../schemas/v2/schemas-v2';

const pricingTableUuid = randomUUID();
describe('Pricing Table V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v2');

  beforeAll(async() => {
    await generateTestData()
  }, 10000)

  it('getAll: should successfully fetch all pricing tables', async () => {
    const data = await salable.pricingTables.getOne(pricingTableUuid);
    console.dir(data, {depth: null});
    expect(data).toEqual(expect.objectContaining(PricingTableSchema));
  });
});


const generateTestData = async () => {

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

import Salable, { Version } from '../..';
import { PaginatedUsageRecords, UsageRecord } from '../../types';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';

const version = Version.V2;

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');
const meteredLicenseUuid = uuidv4();
const usageSubscriptionUuid = uuidv4();
const testGrantee = 'userId_metered';

describe('Usage V2 Tests', () => {
  const salable = new Salable(testUuids.devApiKeyV2, version);

  beforeAll(async () => {
    await generateTestData();
  });

  it('getAllUsageRecords: Should successfully fetch the grantees usage records', async () => {
    const data = await salable.usage.getAllUsageRecords({
      granteeId: testGrantee
    });

    expect(data).toEqual(paginatedUsageRecordsSchema);
  });

  it('getAllUsageRecords (w/ search params): Should successfully fetch the grantees usage records', async () => {
    const data = await salable.usage.getAllUsageRecords({
      granteeId: testGrantee,
      type: 'recorded'
    });

    expect(data).toEqual(
      expect.objectContaining({
        first: expect.toBeOneOf([expect.any(String), null]),
        last: expect.toBeOneOf([expect.any(String), null]),
        data: expect.arrayContaining([
          {
            ...usageRecordSchema,
            type: 'recorded',
          },
        ]),
      }),
    );
  });

  it('getCurrentUsageRecord: Should successfully fetch the current usage record for the grantee on plan', async () => {
    const data = await salable.usage.getCurrentUsageRecord({
      granteeId: testGrantee,
      planUuid: testUuids.usageBasicMonthlyPlanUuid
    });

    expect(data).toEqual(
      expect.objectContaining({
        unitCount: expect.any(Number),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('updateLicenseUsage: Should successfully update the usage of the specified grantee', async () => {
    const data = await salable.usage.updateLicenseUsage({
      granteeId: testGrantee,
      planUuid: testUuids.usageBasicMonthlyPlanUuid,
      increment: 10,
      idempotencyKey: randomUUID()
    });

    expect(data).toBeUndefined();
  });
});

const usageRecordSchema: UsageRecord = {
  uuid: expect.any(String),
  unitCount: expect.any(Number),
  type: expect.any(String),
  recordedAt: expect.toBeOneOf([expect.any(String), null]),
  resetAt: expect.toBeOneOf([expect.any(String), null]),
  planUuid: expect.any(String),
  licenseUuid: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const paginatedUsageRecordsSchema: PaginatedUsageRecords = {
  first: expect.toBeOneOf([expect.any(String), null]),
  last: expect.toBeOneOf([expect.any(String), null]),
  data: expect.arrayContaining([usageRecordSchema]),
};

const generateTestData = async () => {
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.usageBasicSubscriptionLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.usageBasicSubscriptionId,
      uuid: usageSubscriptionUuid,
      email: 'tester@testing.com',
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          purchaser: 'tester@testing.com',
          metadata: undefined,
          paymentService: 'salable',
          uuid: meteredLicenseUuid,
          granteeId: 'userId_metered',
          type: 'metered',
          planUuid: testUuids.usageBasicMonthlyPlanUuid,
          productUuid: testUuids.productTwoUuid,
          usage: {
            create: {
              planUuid: testUuids.usageBasicMonthlyPlanUuid,
              unitCount: 10,
            },
          },
          capabilities: [
            {
              name: 'CapabilityOne',
              uuid: 'ce0a4397-0c0f-4a99-909f-82fd1c8d6d6d',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productTwoUuid,
            },
            {
              name: 'CapabilityTwo',
              uuid: '0a0650a8-4516-44ab-a190-2ba02d276cbc',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productTwoUuid,
            },
          ],
          startTime: undefined,
          endTime: new Date(),
        },
      },
      product: { connect: { uuid: testUuids.productTwoUuid } },
      plan: { connect: { uuid: testUuids.usageBasicMonthlyPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
      quantity: 1,
    },
  });

  await prismaClient.licensesUsage.create({
    data: {
      licenseUuid: meteredLicenseUuid,
      planUuid: testUuids.usageBasicMonthlyPlanUuid,
      unitCount: 10,
      type: 'recorded',
    },
  });
  await prismaClient.licensesUsage.create({
    data: {
      licenseUuid: meteredLicenseUuid,
      planUuid: testUuids.usageBasicMonthlyPlanUuid,
      unitCount: 20,
      type: 'current',
    },
  });
};

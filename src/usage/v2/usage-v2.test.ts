import { initSalable, TVersion, VersionedMethodsReturn } from '../..';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import { PaginatedUsageRecordsSchema, UsageRecordSchema } from '../../schemas/v2/schemas-v2';

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');
const meteredLicenseUuid = randomUUID();
const usageSubscriptionUuid = randomUUID();
const testGrantee = 'userId_metered';
const owner = 'subscription-owner'

describe('Usage Tests for v2, v3', () => {
  const salableVersions = {} as Record<TVersion, VersionedMethodsReturn<TVersion>>
  const versions: {version: TVersion; scopes: string[]}[] = [
    { version: 'v2', scopes: ['usage:read', 'usage:write'] },
    { version: 'v3', scopes: ['usage:read', 'usage:write'] }
  ];
  beforeAll(async () => {
    await generateTestData();
    for (const {version, scopes} of versions) {
      const value = randomUUID()
      await prismaClient.apiKey.create({
        data: {
          name: 'Sample API Key',
          organisation: testUuids.organisationId,
          value,
          scopes: JSON.stringify(scopes),
          status: 'ACTIVE',
        },
      });
      salableVersions[version] = initSalable(value, version);
    }
  });

  it.each(versions)('getAllUsageRecords: Should successfully fetch the grantees usage records', async ({ version }) => {
    const data = await salableVersions[version].usage.getAllUsageRecords({
      granteeId: testGrantee,
    });
    expect(data).toEqual(PaginatedUsageRecordsSchema);
  });
  it.each(versions)('getAllUsageRecords (w/ search params): Should successfully fetch the grantees usage records', async ({ version }) => {
    const data = await salableVersions[version].usage.getAllUsageRecords({
      granteeId: testGrantee,
      type: 'recorded',
    });
    expect(data).toEqual(
      expect.objectContaining({
        first: expect.toBeOneOf([expect.any(String), null]),
        last: expect.toBeOneOf([expect.any(String), null]),
        data: expect.arrayContaining([
          {
            ...UsageRecordSchema,
            type: 'recorded',
          },
        ]),
      }),
    );
  });
  it.each(versions)('getCurrentUsageRecord: Should successfully fetch the current usage record for the grantee on plan', async ({ version }) => {
    const data = await salableVersions[version].usage.getCurrentUsageRecord({
      granteeId: testGrantee,
      planUuid: testUuids.usageBasicMonthlyPlanUuid,
    });
    expect(data).toEqual(
      expect.objectContaining({
        unitCount: expect.any(Number),
        updatedAt: expect.any(String),
      }),
    );
  });
  it.each(versions)('updateLicenseUsage: Should successfully update the usage of the specified grantee', async ({ version }) => {
    const data = await salableVersions[version].usage.updateLicenseUsage({
      granteeId: testGrantee,
      planUuid: testUuids.usageBasicMonthlyPlanUuid,
      increment: 10,
      idempotencyKey: randomUUID(),
    });
    expect(data).toBeUndefined();
  });
});

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
      owner,
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

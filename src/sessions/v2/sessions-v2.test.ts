import { initSalable, TVersion, VersionedMethodsReturn } from '../..';
import { SessionScope } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import getEndTime from 'test-utils/helpers/get-end-time';
import { randomUUID } from 'crypto';
import { SessionSchema } from 'src/schemas/v2/schemas-v2';

const licenseUuid = randomUUID();
const testGrantee = '123456';

describe('Sessions Tests for v2, v3', () => {
  const salableVersions = {} as Record<TVersion, VersionedMethodsReturn<TVersion>>
  const versions: {version: TVersion; scopes: string[]}[] = [
    { version: 'v2', scopes: ['sessions:write'] },
    { version: 'v3', scopes: ['sessions:write'] }
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

  it.each(versions)('createSession: Should successfully create a new session with PricingTable scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.PricingTable,
      metadata: {
        productUuid: testUuids.productUuid,
      },
    });
    expect(data).toEqual(SessionSchema);
  });
  it.each(versions)('createSession: Should successfully create a new session with Checkout scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.Checkout,
      metadata: {
        planUuid: testUuids.paidPlanUuid,
      },
    });
    expect(data).toEqual(SessionSchema);
  });
  it.each(versions)('Should successfully create a new session with Invoice scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.Invoice,
      metadata: {
        subscriptionUuid: testUuids.subscriptionWithInvoicesUuid,
      },
    });
    expect(data).toEqual(SessionSchema);
  });
});

const generateTestData = async () => {
  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: testGrantee,
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: licenseUuid,
      metadata: undefined,
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      product: { connect: { uuid: testUuids.productUuid } },
      startTime: undefined,
      capabilities: [
        {
          name: 'CapabilityOne',
          uuid: randomUUID(),
          status: 'ACTIVE',
          updatedAt: '2022-10-17T11:41:11.626Z',
          description: null,
          productUuid: testUuids.productUuid,
        },
        {
          name: 'CapabilityTwo',
          uuid: randomUUID(),
          status: 'ACTIVE',
          updatedAt: '2022-10-17T11:41:11.626Z',
          description: null,
          productUuid: testUuids.productUuid,
        },
      ],
      endTime: getEndTime(1, 'years'),
    },
  });
};

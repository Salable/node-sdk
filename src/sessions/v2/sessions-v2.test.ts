import Salable, { TVersion } from '../..';
import { Session, SessionScope } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import getEndTime from 'test-utils/helpers/get-end-time';
import { randomUUID } from 'crypto';

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');

const licenseUuid = uuidv4();
const subscriptionUuid = uuidv4();
const testGrantee = '123456';
const owner = 'subscription-owner'

describe('Sessions Tests for v2, v3', () => {
  const salableVersions = {} as Record<TVersion, Salable<TVersion>>
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
      salableVersions[version] = new Salable(value, version);
    }
  });

  it.each(versions)('createSession: Should successfully create a new session with PricingTable scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.PricingTable,
      metadata: {
        productUuid: testUuids.productUuid,
      },
    });
    expect(data).toEqual(sessionSchema);
  });
  it.each(versions)('createSession: Should successfully create a new session with Checkout scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.Checkout,
      metadata: {
        planUuid: testUuids.paidPlanUuid,
      },
    });
    expect(data).toEqual(sessionSchema);
  });
  it.each(versions)('Should successfully create a new session with Invoice scope', async ({ version }) => {
    const data = await salableVersions[version].sessions.create({
      scope: SessionScope.Invoice,
      metadata: {
        subscriptionUuid: subscriptionUuid,
      },
    });
    expect(data).toEqual(sessionSchema);
  });
});

const sessionSchema: Session = {
  sessionToken: expect.any(String),
};

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
          uuid: uuidv4(),
          status: 'ACTIVE',
          updatedAt: '2022-10-17T11:41:11.626Z',
          description: null,
          productUuid: testUuids.productUuid,
        },
        {
          name: 'CapabilityTwo',
          uuid: uuidv4(),
          status: 'ACTIVE',
          updatedAt: '2022-10-17T11:41:11.626Z',
          description: null,
          productUuid: testUuids.productUuid,
        },
      ],
      endTime: getEndTime(1, 'years'),
    },
  });

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.basicSubscriptionFourLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.basicSubscriptionFourId,
      uuid: subscriptionUuid,
      email: 'tester@testing.com',
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: { connect: [{ uuid: licenseUuid }] },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
      owner,
    },
  });
};

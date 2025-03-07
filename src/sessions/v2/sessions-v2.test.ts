import Salable from '../..';
import { Session, SessionScope, Version } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import getEndTime from 'test-utils/helpers/get-end-time';

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');

const licenseUuid = uuidv4();
const subscriptionUuid = uuidv4();
const testGrantee = '123456';

describe('Sessions V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  beforeAll(async () => {
    await generateTestData();
  });

  it('createSession: Should successfully create a new session with PricingTable scope', async () => {
    const data = await salable.sessions.create({
      scope: SessionScope.PricingTable,
      metadata: {
        productUuid: testUuids.productUuid,
      },
    });

    expect(data).toEqual(sessionSchema);
  });

  it('createSession: Should successfully create a new session with Checkout scope', async () => {
    const data = await salable.sessions.create({
      scope: SessionScope.Checkout,
      metadata: {
        planUuid: testUuids.paidPlanUuid,
      },
    });

    expect(data).toEqual(sessionSchema);
  });

  it('createSession: Should successfully create a new session with Invoice scope', async () => {
    const data = await salable.sessions.create({
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
    },
  });
};

import Salable from '../..';
import { Capability, License, Plan, Version } from '../../types';
import prismaClient from "../../../test-utils/prisma/prisma-client";
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import getEndTime from '../../../test-utils/helpers/get-end-time';
import { v4 as uuidv4 } from 'uuid';

const version = Version.V2;

const licenseUuid = uuidv4();
const licenseTwoUuid = uuidv4();
const licenseThreeUuid = uuidv4();
const activeLicenseUuid = uuidv4();
const noSubLicenseUuid = uuidv4();
const noSubLicenseTwoUuid = uuidv4();
const noSubLicenseThreeUuid = uuidv4();
const subscriptionUuid = uuidv4();
const testPurchaser = 'tester@testing.com';
const testGrantee = '123456';

describe('Licenses V2 Tests', () => {
  const salable = new Salable(testUuids.devApiKeyV2, version);

  beforeAll(async () => {
    await generateTestData();
  });

  afterAll(async () => {
    await deleteTestData();
  })

  it('getOne: Should successfully fetch the specified license', async () => {
    const data = await salable.licenses.getOne(licenseUuid);

    expect(data).toEqual(licenseSchema);
    expect(data).not.toHaveProperty('plan');
  });

  it('getOne (w/ search params): Should successfully fetch the specified license', async () => {
    const dataWithSearchParams = await salable.licenses.getOne(licenseUuid, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual({ ...licenseSchema, plan: planSchema });
    expect(dataWithSearchParams).toHaveProperty('plan', planSchema);
  });
  
  it('getAll: Should successfully fetch licenses', async () => {
    const data = await salable.licenses.getAll();

    expect(data).toEqual({
      first: expect.toBeOneOf([expect.any(String), null]),
      last: expect.toBeOneOf([expect.any(String), null]),
      data: expect.arrayContaining([licenseSchema]),
    });
  });

  it('getAll (w/ search params): Should successfully fetch licenses', async () => {
    const dataWithSearchParams = await salable.licenses.getAll({
      status: 'ACTIVE',
      take: '3',
      subscriptionUuid: subscriptionUuid,
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([licenseSchema]),
    });
    expect(dataWithSearchParams.data.length).toEqual(3);
    for (const license of dataWithSearchParams.data) {
      expect(license).toHaveProperty('status', 'ACTIVE');
    }
  });

  it('getCount: Should successfully fetch a subscriptions count', async () => {
    const data = await salable.licenses.getCount();

    expect(data).toEqual({
      count: expect.any(Number),
      assigned: expect.any(Number),
      unassigned: expect.any(Number),
    });
  });

  it('getCount (w/ search params): Should successfully fetch a subscriptions count', async () => {
    const dataWithSearchParams = await salable.licenses.getCount({
      subscriptionUuid: subscriptionUuid,
      status: 'ACTIVE',
    });

    expect(dataWithSearchParams).toEqual({
      count: expect.any(Number),
      assigned: expect.any(Number),
      unassigned: expect.any(Number),
    });
  });

  it('getForPurchaser: Should successfully fetch a purchasers licenses', async () => {
    const data = await salable.licenses.getForPurchaser({ purchaser: testPurchaser, productUuid: testUuids.productUuid });

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('getForPurchaser (w/ search params): Should successfully fetch a purchasers licenses', async () => {
    const dataWithSearchParams = await salable.licenses.getForPurchaser({
      purchaser: testPurchaser,
      productUuid: testUuids.productUuid,
      status: 'ACTIVE',
    });

    expect(dataWithSearchParams).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...licenseSchema,
          status: 'ACTIVE',
          purchaser: testPurchaser,
          productUuid: testUuids.productUuid,
        }),
      ]),
    );
  });

  it('getForGranteeId: Should successfully fetch a grantees licenses', async () => {
    const data = await salable.licenses.getForGranteeId(testGrantee);

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('getForGranteeId (w/ search params): Should successfully fetch a grantees licenses', async () => {
    const dataWithSearchParams = await salable.licenses.getForGranteeId(testGrantee, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...licenseSchema,
          plan: planSchema,
        }),
      ]),
    );
  });

  it('create: Should successfully create a license', async () => {
    const data = await salable.licenses.create({
      planUuid: testUuids.paidPlanUuid,
      member: 'example',
      granteeId: 'test-grantee-id',
      status: 'ACTIVE',
      endTime: '2025-07-06T12:00:00.000Z',
    });

    expect(data).toEqual(expect.objectContaining(licenseSchema));
  });

  it('createMany: Should successfully create multiple licenses', async () => {
    const data = await salable.licenses.createMany([
      {
        planUuid: testUuids.paidPlanUuid,
        member: 'example',
        granteeId: 'example-grantee-id',
        status: 'ACTIVE',
        endTime: '2025-07-06T12:00:00.000Z',
      },
      {
        planUuid: testUuids.paidPlanUuid,
        member: 'example',
        granteeId: 'example-other-grantee-id',
        status: 'ACTIVE',
        endTime: '2025-07-06T12:00:00.000Z',
      },
    ]);

    expect(data.length).toEqual(2);
    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('update: Should successfully update a license', async () => {
    const data = await salable.licenses.update(noSubLicenseUuid, { granteeId: 'updated-grantee-id' });

    expect(data.granteeId).toEqual('updated-grantee-id');
  });

  it('updateMany: Should successfully update multiple licenses', async () => {
    const data = await salable.licenses.updateMany([
      {
        uuid: noSubLicenseTwoUuid,
        granteeId: 'updated-grantee-id',
      },
      {
        uuid: noSubLicenseThreeUuid,
        granteeId: 'updated-grantee-id',
      },
    ]);

    expect(data.length).toEqual(2);
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...licenseSchema,
          granteeId: 'updated-grantee-id',
        }),
      ]),
    );
  });

  it('cancel: Should successfully cancel the specified license', async () => {
    const data = await salable.licenses.cancel(noSubLicenseUuid);

    expect(data).toBeUndefined();
  });

  it('cancelMany: Should successfully multiple licenses', async () => {
    const data = await salable.licenses.cancelMany({ uuids: [noSubLicenseTwoUuid, noSubLicenseThreeUuid] });

    expect(data).toBeUndefined();
  });

  it('check: Should successfully check the specified grantees permissions', async () => {
    const data = await salable.licenses.check({
      productUuid: testUuids.productUuid,
      granteeIds: [testGrantee],
    });

    expect(data).toEqual(
      expect.objectContaining({
        capabilities: expect.arrayContaining([
          {
            capability: expect.any(String),
            expiry: expect.any(String),
          },
        ]),
        signature: expect.any(String),
      }),
    );
  });

  it('verify: Verifies the license-check signatures correctly', async () => {
    const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAES7jvFxC50Fe2hHd3Sn7Q8TvnxuSZ\nV8HvRHGDvFacOiESAqg3uroeNTgoT7lD4BwQ+fFsn7zig5hwncoTsrCPbw==\n-----END PUBLIC KEY-----`;
    const testLicenseCheckData = [
      { capability: 'One', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'Two', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'free_plan_name', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Three', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Four', expiry: '2024-08-14T13:32:29.313Z' },
    ];
    const testSignature = '3045022100b210aa29519f3146afe7a0d343a6b7ec5e47a1ac0de9686e2ec4cf0081e159c402206ecf98ad4d1d339c59f7ff3b4744d1f377747702c6253f7904ef6589191a2254';
    const testIncorrectSignature = 'bad-signature';

    const falseLicenseCheck = salable.licenses.verify({
      publicKey: testPublicKeyPem,
      signature: testIncorrectSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });
    const trueLicenseCheck = salable.licenses.verify({
      publicKey: testPublicKeyPem,
      signature: testSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });

    expect(falseLicenseCheck).toEqual(false);
    expect(trueLicenseCheck).toEqual(true);
  });
});

const licenseCapabilitySchema: Capability = {
  uuid: expect.any(String),
  productUuid: expect.any(String),
  name: expect.any(String),
  status: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  updatedAt: expect.any(String),
};

const licenseSchema: License = {
  uuid: expect.any(String),
  name: expect.toBeOneOf([expect.any(String), null]),
  email: expect.toBeOneOf([expect.any(String), null]),
  subscriptionUuid: expect.toBeOneOf([expect.any(String), null]),
  status: expect.toBeOneOf(['ACTIVE', 'CANCELED', 'EVALUATION', 'SCHEDULED', 'TRIALING', 'INACTIVE']),
  granteeId: expect.toBeOneOf([expect.any(String), null]),
  paymentService: expect.toBeOneOf(['ad-hoc', 'salable', 'stripe_existing']),
  purchaser: expect.any(String),
  type: expect.toBeOneOf(['licensed', 'metered', 'perSeat', 'customId', 'user']),
  productUuid: expect.any(String),
  planUuid: expect.any(String),
  capabilities: expect.arrayContaining([licenseCapabilitySchema]),
  metadata: expect.toBeOneOf([expect.anything(), null]),
  startTime: expect.any(String),
  endTime: expect.any(String),
  updatedAt: expect.any(String),
  isTest: expect.any(Boolean),
  cancelAtPeriodEnd: expect.any(Boolean),
};

const planSchema: Plan = {
  uuid: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  status: expect.any(String),
  trialDays: expect.toBeOneOf([expect.any(Number), null]),
  evaluation: expect.any(Boolean),
  evalDays: expect.any(Number),
  perSeatAmount: expect.any(Number),
  maxSeatAmount: expect.any(Number),
  organisation: expect.any(String),
  visibility: expect.any(String),
  licenseType: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
  interval: expect.any(String),
  length: expect.any(Number),
  active: expect.any(Boolean),
  planType: expect.any(String),
  pricingType: expect.any(String),
  environment: expect.any(String),
  isTest: expect.any(Boolean),
  paddlePlanId: expect.toBeOneOf([expect.any(String), null]),
  productUuid: expect.any(String),
  salablePlan: expect.any(Boolean),
  type: expect.toBeOneOf([expect.any(String), undefined]),
  updatedAt: expect.any(String),
  features: expect.toBeOneOf([expect.anything(), undefined]),
};

const deleteTestData = async () => {
  await prismaClient.license.deleteMany({});
  await prismaClient.subscription.deleteMany({});
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
        }
      ],
      endTime: getEndTime(1, 'years'),
    }
  })

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: testGrantee,
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: licenseTwoUuid,
      metadata: undefined,
      plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
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
        }
      ],
      endTime: getEndTime(1, 'years'),
    }
  });

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: testGrantee,
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: licenseThreeUuid,
      metadata: undefined,
      plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
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
        }
      ],
      endTime: getEndTime(1, 'years'),
    }
  });

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: "active-grantee-id",
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: activeLicenseUuid,
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
        }
      ],
      endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: "no-sub-license",
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: noSubLicenseUuid,
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
        }
      ],
      endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: "no-sub-license",
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: noSubLicenseTwoUuid,
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
        }
      ],
      endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  await prismaClient.license.create({
    data: {
      name: null,
      email: null,
      status: 'ACTIVE',
      granteeId: "no-sub-license",
      paymentService: 'ad-hoc',
      purchaser: 'tester@testing.com',
      type: 'user',
      uuid: noSubLicenseThreeUuid,
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
        }
      ],
      endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    }
  });

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.basicSubscriptionLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.basicSubscriptionId,
      uuid: subscriptionUuid,
      email: 'tester@testing.com',
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: { connect: [{ uuid: licenseUuid }, { uuid: licenseTwoUuid }, { uuid: licenseThreeUuid }] },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });
};

import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import getEndTime from '../../../test-utils/helpers/get-end-time';
import { initSalable } from '../../index';
import { randomUUID } from 'crypto';
import { addMonths } from 'date-fns';
import { LicenseSchema, PaginatedLicensesSchema, PlanSchema } from '../../schemas/v2/schemas-v2';

const licenseUuid = randomUUID();
const licenseTwoUuid = randomUUID();
const licenseThreeUuid = randomUUID();
const activeLicenseUuid = randomUUID();
const noSubLicenseUuid = randomUUID();
const noSubLicenseTwoUuid = randomUUID();
const noSubLicenseThreeUuid = randomUUID();
const subscriptionUuid = randomUUID();
const testPurchaser = randomUUID();
const testGrantee = randomUUID();
const owner = randomUUID();
const organisation = randomUUID();

describe('Licenses V2 Tests', () => {
  const salable = initSalable(testUuids.devApiKeyV2, 'v2');

  beforeAll(async () => {
    await generateTestData();
  });

  it('getOne: Should successfully fetch the specified license', async () => {
    const data = await salable.licenses.getOne(licenseUuid);

    expect(data).toEqual(LicenseSchema);
    expect(data).not.toHaveProperty('plan');
  });

  it('getOne (w/ search params): Should successfully fetch the specified license', async () => {
    const dataWithSearchParams = await salable.licenses.getOne(licenseUuid, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual({ ...LicenseSchema, plan: PlanSchema });
    expect(dataWithSearchParams).toHaveProperty('plan', PlanSchema);
  });

  it('getAll: Should successfully fetch licenses', async () => {
    const data = await salable.licenses.getAll();

    expect(data).toEqual(PaginatedLicensesSchema);
  });

  it('getAll (w/ search params): Should successfully fetch licenses', async () => {
    const dataWithSearchParams = await salable.licenses.getAll({
      status: 'ACTIVE',
      take: 3,
      subscriptionUuid: subscriptionUuid,
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([LicenseSchema]),
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

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(LicenseSchema)]));
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
          ...LicenseSchema,
          status: 'ACTIVE',
          purchaser: testPurchaser,
          productUuid: testUuids.productUuid,
        }),
      ]),
    );
  });

  it('getForGranteeId: Should successfully fetch a grantees licenses', async () => {
    const data = await salable.licenses.getForGranteeId(testGrantee);

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(LicenseSchema)]));
  });

  it('getForGranteeId (w/ search params): Should successfully fetch a grantees licenses', async () => {
    const dataWithSearchParams = await salable.licenses.getForGranteeId(testGrantee, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...LicenseSchema,
          plan: PlanSchema,
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

    expect(data).toEqual(expect.objectContaining(LicenseSchema));
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
    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(LicenseSchema)]));
  });

  it('update: Should successfully update a license', async () => {
    const data = await salable.licenses.update(noSubLicenseUuid, { granteeId: null });

    expect(data.granteeId).toEqual(null);
  });

  it('updateMany: Should successfully update multiple licenses', async () => {
    const data = await salable.licenses.updateMany([
      {
        uuid: noSubLicenseUuid,
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
          ...LicenseSchema,
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

  it('check: Should return undefined if grantee is not licensed', async () => {
    const data = await salable.licenses.check({
      productUuid: testUuids.productUuid,
      granteeIds: ['not-licensed-grantee'],
    });

    expect(data).toBeUndefined();
  });
});

const generateTestData = async () => {
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
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
      }
    }
  })
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
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
      }
    }
  })
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
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
      }
    }
  })
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: 'active-grantee-id',
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
          endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        },
      }
    }
  })
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: 'no-sub-license',
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
          endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        },
      }
    }
  })

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner: testPurchaser,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: 'no-sub-license',
          paymentService: 'ad-hoc',
          purchaser: testPurchaser,
          type: 'user',
          uuid: noSubLicenseTwoUuid,
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
          endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
        },
      }
    }
  })

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: 'no-sub-license',
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
          endTime: addMonths(new Date(), 1),
        },
      }
    }
  })

  await prismaClient.subscription.create({
    data: {
      uuid: subscriptionUuid,
      lineItemIds: [],
      paymentIntegrationSubscriptionId: subscriptionUuid,
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      owner,
      organisation,
      license: { connect: [{ uuid: licenseUuid }, { uuid: licenseTwoUuid }, { uuid: licenseThreeUuid }] },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
    },
  });
};

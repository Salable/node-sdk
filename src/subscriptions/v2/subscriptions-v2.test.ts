import prismaClient from '../../../test-utils/prisma/prisma-client';
import { SeatActionType } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import { initSalable } from '../../index';
import { PaginatedLicensesSchema, PaginationSubscriptionSchema, PlanSchema, StripeInvoiceSchema, StripePaymentMethodSchema, SubscriptionSchema } from '../../schemas/v2/schemas-v2';
import { addMonths } from 'date-fns';

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');

const basicSubscriptionUuid = randomUUID();
const perSeatSubscriptionUuid = randomUUID();
const couponUuid = randomUUID();
const testGrantee = randomUUID();
const testEmail = randomUUID();
const owner = randomUUID();
const differentOwner = randomUUID();
const subscriptionToBeCancelledUuid = randomUUID();
const differentOwnerSubscriptionUuid = randomUUID()
const subscriptionUuidTwo = randomUUID();

describe('Subscriptions V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v2');

  beforeAll(async () => {
    await generateTestData();
  });

  it('create: Should successfully create a subscription without a payment integration', async () => {
    const data = await salable.subscriptions.create({
      planUuid: testUuids.paidPlanUuid,
      owner: 'example',
      granteeId: 'test-grantee-id',
      status: 'ACTIVE',
      expiryDate: '2045-07-06T12:00:00.000Z',
    });

    expect(data).toEqual(expect.objectContaining(SubscriptionSchema));
  });

  it('getAll: Should successfully fetch subscriptions', async () => {
    const data = await salable.subscriptions.getAll();

    expect(data).toEqual(PaginationSubscriptionSchema);
  });

  it('getAll (w/ search params): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      status: 'ACTIVE',
      take: 3,
      email: testEmail,
      expand: ['plan'],
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([{ ...SubscriptionSchema, plan: PlanSchema }]),
    });
    expect(dataWithSearchParams.data.length).toEqual(3);
    expect(dataWithSearchParams.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...SubscriptionSchema,
          status: 'ACTIVE',
          email: testEmail,
          plan: PlanSchema,
        }),
      ]),
    );
  });

  it('getAll (w/ search params sort, productUuid & planUuid): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      expand: ['plan'],
      sort: 'desc',
      productUuid: testUuids.productUuid,
      planUuid: testUuids.paidPlanTwoUuid,
      take: 2
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([{ ...SubscriptionSchema, plan: PlanSchema }]),
    });
    expect(dataWithSearchParams.data.length).toEqual(2);
    expect(dataWithSearchParams.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...SubscriptionSchema,
          productUuid: testUuids.productUuid,
          plan: {
            ...PlanSchema,
            uuid: testUuids.paidPlanTwoUuid,
          },
        }),
      ]),
    );
  });

  it('getAll (w/ search params owner): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      owner: differentOwner,
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([{ ...SubscriptionSchema, owner: differentOwner }]),
    });
    expect(dataWithSearchParams.data.length).toEqual(1);
    expect(dataWithSearchParams.data).toEqual([{ ...SubscriptionSchema, owner: differentOwner }]);
  });

  it("getSeats: Should successfully fetch a subscription's seats", async () => {
    const data = await salable.subscriptions.getSeats(perSeatSubscriptionUuid);
    expect(data).toEqual(PaginatedLicensesSchema);
  });

  it("getSeatCount: Should successfully fetch a subscription's seat count", async () => {
    const data = await salable.subscriptions.getSeatCount(perSeatSubscriptionUuid);
    expect(data).toEqual({
      count: expect.any(Number),
      assigned: expect.any(Number),
      unassigned: expect.any(Number),
    });
  });

  it('getOne: Should successfully fetch the specified subscription', async () => {
    const data = await salable.subscriptions.getOne(basicSubscriptionUuid);

    expect(data).toEqual(SubscriptionSchema);
    expect(data).not.toHaveProperty('plan');
  });

  it('getOne (w/ search params): Should successfully fetch the specified subscription', async () => {
    const dataWithSearchParams = await salable.subscriptions.getOne(basicSubscriptionUuid, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual({ ...SubscriptionSchema, plan: PlanSchema });
    expect(dataWithSearchParams).toHaveProperty('plan', PlanSchema);
  });

  it('getInvoices: Should successfully fetch a subscriptions invoices', async () => {
    const data = await salable.subscriptions.getInvoices(testUuids.subscriptionWithInvoicesUuid);

    expect(data).toEqual(StripeInvoiceSchema);
  });

  it('getInvoices (w/ search params): Should successfully fetch a subscriptions invoices', async () => {
    const data = await salable.subscriptions.getInvoices(testUuids.subscriptionWithInvoicesUuid, { take: 1 });

    expect(data).toEqual(StripeInvoiceSchema);
    expect(data.data.length).toEqual(1);
  });

  it('getSwitchablePlans: Should successfully fetch a subscriptions switchable plans', async () => {
    const data = await salable.subscriptions.getSwitchablePlans(testUuids.subscriptionWithInvoicesUuid);
    expect(data).toEqual(expect.arrayContaining([PlanSchema]));
  });

  it('getUpdatePaymentLink: Should successfully fetch a subscriptions payment link', async () => {
    const data = await salable.subscriptions.getUpdatePaymentLink(testUuids.subscriptionWithInvoicesUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getPortalLink: Should successfully fetch a subscriptions portal link', async () => {
    const data = await salable.subscriptions.getPortalLink(testUuids.subscriptionWithInvoicesUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getCancelSubscriptionLink: Should successfully fetch a subscriptions cancel link', async () => {
    const data = await salable.subscriptions.getCancelSubscriptionLink(testUuids.subscriptionWithInvoicesUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getPaymentMethod: Should successfully fetch a subscriptions payment method', async () => {
    const data = await salable.subscriptions.getPaymentMethod(testUuids.subscriptionWithInvoicesUuid);

    expect(data).toEqual(expect.objectContaining(StripePaymentMethodSchema));
  });

  it('changePlan: Should successfully change a subscriptions plan', async () => {
    const data = await salable.subscriptions.changePlan(basicSubscriptionUuid, {
      planUuid: testUuids.perSeatPaidPlanUuid,
    });

    expect(data).toBeUndefined();
  });

  it('manageSeats: Should successfully perform multiple seat actions', async () => {
    const data = await salable.subscriptions.manageSeats(perSeatSubscriptionUuid, [
      { type: SeatActionType.assign, granteeId: 'assign_grantee_id' },
      { type: SeatActionType.unassign, granteeId: 'userId_0' },
      { type: SeatActionType.replace, granteeId: 'userId_1', newGranteeId: 'replace_grantee_id' },
    ]);

    expect(data).toBeUndefined();
  });

  it('addSeats: Should successfully add seats to the subscription of type none', async () => {
    const data = await salable.subscriptions.addSeats(perSeatSubscriptionUuid, {
      increment: 1,
    });
    expect(data).toBeUndefined();
  });

  it('addSeats: Should successfully add seats to the subscription of type salable', async () => {
    const data = await salable.subscriptions.addSeats(testUuids.perSeatSubscriptionUuid, {
      increment: 1,
    });
    expect(data).toEqual({
      eventUuid: expect.any(String),
    });
  });

  it('removeSeats: Should successfully remove seats from a subscription', async () => {
    const data = await salable.subscriptions.removeSeats(perSeatSubscriptionUuid, {
      decrement: 1,
    });

    expect(data).toBeUndefined();
  });

  it('removeSeats: Should successfully remove seats to the subscription of type salable', async () => {
    const data = await salable.subscriptions.removeSeats(testUuids.perSeatSubscriptionUuid, {
      decrement: 1,
    });
    expect(data).toEqual({
      eventUuid: expect.any(String),
    });
  });

  it('update: Should successfully update a subscription owner', async () => {
    const data = await salable.subscriptions.update(perSeatSubscriptionUuid, {
      owner: 'updated-owner',
    });

    expect(data).toEqual({ ...SubscriptionSchema, owner: 'updated-owner' });
  });

  it('addCoupon: Should successfully add the specified coupon to the subscription', async () => {
    const data = await salable.subscriptions.addCoupon(testUuids.couponSubscriptionUuidV2, { couponUuid });

    expect(data).toBeUndefined();
  });

  it('removeCoupon: Should successfully remove the specified coupon from the subscription', async () => {
    const data = await salable.subscriptions.removeCoupon(testUuids.couponSubscriptionUuidV2, { couponUuid });

    expect(data).toBeUndefined();
  });
  
  it('cancel: Should successfully cancel the subscription', async () => {
    const data = await salable.subscriptions.cancel(subscriptionToBeCancelledUuid, { when: 'now' });

    expect(data).toBeUndefined();
  });
});

const generateTestData = async () => {
  await prismaClient.subscription.create({
    data: {
      uuid: basicSubscriptionUuid,
      paymentIntegrationSubscriptionId: stripeEnvs.subscriptionV2Id,
      lineItemIds: [stripeEnvs.subscriptionV2LineItemId],
      email: testEmail,
      owner,
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: testGrantee,
          paymentService: 'ad-hoc',
          purchaser: 'tester@testing.com',
          type: 'licensed',
          metadata: undefined,
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: undefined,
          capabilities: [
            {
              name: 'CapabilityOne',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
            {
              name: 'CapabilityTwo',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
          ],
          endTime: addMonths(new Date(), 1),
        },
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });

  await prismaClient.subscription.create({
    data: {
      uuid: differentOwnerSubscriptionUuid,
      paymentIntegrationSubscriptionId: differentOwnerSubscriptionUuid,
      lineItemIds: [],
      email: testEmail,
      owner: differentOwner,
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: testGrantee,
          paymentService: 'ad-hoc',
          purchaser: 'tester@testing.com',
          type: 'licensed',
          metadata: undefined,
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: undefined,
          capabilities: [
            {
              name: 'CapabilityOne',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
            {
              name: 'CapabilityTwo',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
          ],
          endTime: addMonths(new Date(), 1),
        },
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });

  await prismaClient.subscription.create({
    data: {
      uuid: subscriptionUuidTwo,
      paymentIntegrationSubscriptionId: subscriptionUuidTwo,
      lineItemIds: [],
      email: testEmail,
      owner,
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: testGrantee,
          paymentService: 'ad-hoc',
          purchaser: 'tester@testing.com',
          type: 'licensed',
          plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: new Date(),
          capabilities: [
            {
              name: 'CapabilityOne',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
            {
              name: 'CapabilityTwo',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
          ],
          endTime: addMonths(new Date(), 1),
        },
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
    },
  });

  await prismaClient.subscription.create({
    data: {
      uuid: perSeatSubscriptionUuid,
      lineItemIds: [],
      paymentIntegrationSubscriptionId: perSeatSubscriptionUuid,
      email: testEmail,
      owner,
      type: 'none',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        createMany: {
          data: Array.from({ length: 3 }, (I, i) => ({
            name: null,
            email: null,
            status: 'ACTIVE',
            paymentService: 'ad-hoc',
            purchaser: 'tester@testing.com',
            metadata: undefined,
            startTime: undefined,
            capabilities: [
              {
                name: 'CapabilityOne',
                uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
                status: 'ACTIVE',
                updatedAt: '2022-10-17T11:41:11.626Z',
                description: null,
                productUuid: testUuids.productUuid,
              },
              {
                name: 'CapabilityTwo',
                uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
                status: 'ACTIVE',
                updatedAt: '2022-10-17T11:41:11.626Z',
                description: null,
                productUuid: testUuids.productUuid,
              },
            ],
            endTime: addMonths(new Date(), 1),
            granteeId: i < 2 ? `userId_${i}` : null,
            type: 'perSeat',
            planUuid: testUuids.perSeatMaxPlanUuid,
            productUuid: testUuids.productUuid,
          })),
        },
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.perSeatPaidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      quantity: 2,
    },
  });

  await prismaClient.subscription.create({
    data: {
      uuid: subscriptionToBeCancelledUuid,
      lineItemIds: [],
      paymentIntegrationSubscriptionId: subscriptionToBeCancelledUuid,
      email: testEmail,
      owner,
      type: 'none',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: testGrantee,
          paymentService: 'ad-hoc',
          purchaser: 'tester@testing.com',
          type: 'licensed',
          plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: new Date(),
          capabilities: [
            {
              name: 'CapabilityOne',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
            {
              name: 'CapabilityTwo',
              uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
              status: 'ACTIVE',
              updatedAt: '2022-10-17T11:41:11.626Z',
              description: null,
              productUuid: testUuids.productUuid,
            },
          ],
          endTime: addMonths(new Date(), 1),
        },
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
    }
  })

  await prismaClient.coupon.create({
    data: {
      uuid: couponUuid,
      paymentIntegrationCouponId: stripeEnvs.couponId,
      name: 'Percentage Coupon',
      duration: 'ONCE',
      discountType: 'PERCENTAGE',
      percentOff: 10,
      expiresAt: null,
      maxRedemptions: null,
      isTest: false,
      durationInMonths: 1,
      status: 'ACTIVE',
      product: { connect: { uuid: testUuids.productUuid } },
      appliesTo: {
        create: { plan: { connect: { uuid: testUuids.paidPlanTwoUuid } } },
      },
    },
  });
};

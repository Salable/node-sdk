import prismaClient from '../../../test-utils/prisma/prisma-client';
import {
  SeatActionType,
} from '../../types';
import getEndTime from '../../../test-utils/helpers/get-end-time';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import { PlanFeatureSchemaV3, PlanCurrencySchema, PlanSchemaV3, PaginatedLicensesSchemaV3 } from '../../schemas/v3/schemas-v3';
import { addMonths } from 'date-fns';
import { initSalable } from '../../index';
import { PaginationSubscriptionSchema, StripeInvoiceSchema, StripePaymentMethodSchema, SubscriptionSchema } from '../../schemas/v2/schemas-v2';

const stripeEnvs = JSON.parse(process.env.stripEnvs || '');

const basicSubscriptionUuid = randomUUID();
const perSeatSubscriptionUuid = randomUUID();
const couponUuid = randomUUID();
const perSeatBasicLicenseUuids = [randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID(), randomUUID()];
const testGrantee = randomUUID();
const testEmail = randomUUID();
const owner = randomUUID();
const differentOwner = randomUUID();
const testSubscriptionTwoUuid = randomUUID();
const differentOwnerSubscriptionUuid = randomUUID();



describe('Subscriptions V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV3;
  const salable = initSalable(apiKey, 'v3');

  beforeAll(async () => {
    await generateTestData();
  }, 10000);

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
      owner,
      expand: ['plan'],
    });
    console.log(dataWithSearchParams);
    expect(dataWithSearchParams.first).toEqual(expect.any(String))
    expect(dataWithSearchParams.last).toEqual(expect.any(String))
    expect(dataWithSearchParams.data.length).toEqual(3);
    expect(dataWithSearchParams.data).toEqual(
      expect.arrayContaining([
        {
          ...SubscriptionSchema,
          status: 'ACTIVE',
          owner,
          plan: PlanSchemaV3
        },
      ]),
    );
  });

  it('getAll (w/ search params sort, productUuid & planUuid): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      sort: 'desc',
      productUuid: testUuids.productUuid,
      planUuid: testUuids.paidPlanTwoUuid,
      take: 4
    });
    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([SubscriptionSchema]),
    });
    expect(dataWithSearchParams.data.length).toEqual(4);
    expect(dataWithSearchParams.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...SubscriptionSchema,
          productUuid: testUuids.productUuid,
          planUuid: testUuids.paidPlanTwoUuid,
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
      data: expect.arrayContaining([SubscriptionSchema]),
    });
    expect(dataWithSearchParams.data.length).toEqual(1);
    expect(dataWithSearchParams.data).toEqual([{ ...SubscriptionSchema, owner: differentOwner }]);
  });

  it("getSeats: Should successfully fetch a subscription's seats", async () => {
    const data = await salable.subscriptions.getSeats(perSeatSubscriptionUuid);
    expect(data).toEqual(PaginatedLicensesSchemaV3);
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
    expect(dataWithSearchParams).toEqual({
      ...SubscriptionSchema,
      plan: {
        ...PlanSchemaV3,
        features: expect.arrayContaining([PlanFeatureSchemaV3]),
        currencies: expect.arrayContaining([PlanCurrencySchema]),
      }
    });
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
    expect(data).toEqual(SubscriptionSchema);
  });

  it('manageSeats: Should successfully perform multiple seat actions', async () => {
    const data = await salable.subscriptions.manageSeats(perSeatSubscriptionUuid, [
      { type: SeatActionType.assign, granteeId: 'assign_grantee_id' },
      { type: SeatActionType.unassign, granteeId: 'userId_0' },
      { type: SeatActionType.replace, granteeId: 'userId_1', newGranteeId: 'replace_grantee_id' },
    ]);
    expect(data).toBeUndefined();
  });

  it('updateSeatCount: Should successfully add seat to the subscription', async () => {
    const data = await salable.subscriptions.updateSeatCount(perSeatSubscriptionUuid, {
      increment: 1,
    });
    expect(data).toBeUndefined();
  });

  it('updateSeatCount: Should successfully remove seat from the subscription', async () => {
    const data = await salable.subscriptions.updateSeatCount(perSeatSubscriptionUuid, {
      decrement: 1,
    });
    expect(data).toBeUndefined();
  });

  it('update: Should successfully update a subscription owner', async () => {
    const data = await salable.subscriptions.update(perSeatSubscriptionUuid, {
      owner: 'updated-owner',
    });
    expect(data).toEqual({ ...SubscriptionSchema, owner: 'updated-owner' });
  });

  it('addCoupon: Should successfully add the specified coupon to the subscription', async () => {
    const data = await salable.subscriptions.addCoupon(testUuids.couponSubscriptionUuidV3, { couponUuid });
    expect(data).toBeUndefined();
  });

  it('removeCoupon: Should successfully remove the specified coupon from the subscription', async () => {
    const data = await salable.subscriptions.removeCoupon(testUuids.couponSubscriptionUuidV3, { couponUuid });
    expect(data).toBeUndefined();
  });
  
  it('cancel: Should successfully cancel the subscription', async () => {
    const data = await salable.subscriptions.cancel(perSeatSubscriptionUuid, { when: 'now' });
    expect(data).toBeUndefined();
  });
});

const generateTestData = async () => {
  await prismaClient.subscription.create({
    data: {
      uuid: basicSubscriptionUuid,
      paymentIntegrationSubscriptionId: basicSubscriptionUuid,
      lineItemIds: [],
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
          metadata: undefined,
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: undefined,
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
    },
  });

  await prismaClient.subscription.create({
    data: {
      uuid: testSubscriptionTwoUuid,
      paymentIntegrationSubscriptionId: testSubscriptionTwoUuid,
      lineItemIds: [],
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
          metadata: undefined,
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: undefined,
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
    },
  });
  await prismaClient.subscription.create({
    data: {
      uuid: differentOwnerSubscriptionUuid,
      paymentIntegrationSubscriptionId: differentOwnerSubscriptionUuid,
      lineItemIds: [],
      email: testEmail,
      owner: differentOwner,
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
          metadata: undefined,
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: undefined,
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
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
          data: perSeatBasicLicenseUuids.slice(3, 6).map((uuid, i) => ({
            name: null,
            email: null,
            status: 'ACTIVE',
            paymentService: 'ad-hoc',
            purchaser: 'tester@testing.com',
            metadata: undefined,
            startTime: undefined,
            capabilities: [],
            endTime: getEndTime(1, 'years'),
            uuid,
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
      expiryDate: new Date(Date.now() + 31536000000),
      quantity: 2,
    },
  });

  await prismaClient.coupon.create({
    data: {
      uuid: couponUuid,
      paymentIntegrationCouponId: stripeEnvs.couponV3Id,
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

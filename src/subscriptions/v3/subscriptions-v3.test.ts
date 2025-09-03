import prismaClient from '../../../test-utils/prisma/prisma-client';
import {
  PaginatedSubscription,
  Invoice,
  PaginatedSubscriptionInvoice,
  PaginatedLicenses,
  SeatActionType,
} from '../../types';
import getEndTime from '../../../test-utils/helpers/get-end-time';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import {
  PlanFeatureSchemaV3,
  LicenseSchemaV3,
  PlanCurrencySchema,
  PlanSchemaV3, SubscriptionSchema
} from '../../schemas/v3/schemas-v3';
import { addMonths } from 'date-fns';
import { initSalable } from '../../index';

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
  const apiKey = testUuids.devApiKeyV2;
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
    expect(data).toEqual(paginationSubscriptionSchema);
  });

  it('getAll (w/ search params): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      status: 'ACTIVE',
      take: 3,
      owner,
      expand: ['plan'],
    });
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
    expect(data).toEqual(paginatedLicensesSchema);
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
    expect(data).toEqual(stripeInvoiceSchema);
  });

  it('getInvoices (w/ search params): Should successfully fetch a subscriptions invoices', async () => {
    const data = await salable.subscriptions.getInvoices(testUuids.subscriptionWithInvoicesUuid, { take: 1 });
    expect(data).toEqual(stripeInvoiceSchema);
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
    expect(data).toEqual(expect.objectContaining(stripePaymentMethodSchema));
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

const paginatedLicensesSchema: PaginatedLicenses = {
  first: expect.toBeOneOf([expect.any(String), null]),
  last: expect.toBeOneOf([expect.any(String), null]),
  data: expect.arrayContaining([LicenseSchemaV3]),
};

const paginationSubscriptionSchema: PaginatedSubscription = {
  first: expect.any(String),
  last: expect.any(String),
  data: expect.arrayContaining([SubscriptionSchema]),
};

const invoiceSchema: Invoice = {
  id: expect.any(String),
  object: expect.any(String),
  account_country: expect.any(String),
  account_name: expect.any(String),
  account_tax_ids: expect.toBeOneOf([expect.toBeArray(), null]),
  amount_due: expect.any(Number),
  amount_paid: expect.any(Number),
  amount_overpaid: expect.any(Number),
  amount_remaining: expect.any(Number),
  amount_shipping: expect.any(Number),
  application: expect.toBeOneOf([expect.any(String), null]),
  application_fee_amount: expect.toBeOneOf([expect.any(Number), null]),
  attempt_count: expect.any(Number),
  attempted: expect.any(Boolean),
  auto_advance: expect.any(Boolean),
  automatic_tax: expect.toBeObject(),
  automatically_finalizes_at: expect.toBeOneOf([expect.any(Number), null]),
  billing_reason: expect.any(String),
  charge: expect.any(String),
  collection_method: expect.any(String),
  created: expect.any(Number),
  currency: expect.any(String),
  custom_fields: expect.toBeOneOf([expect.toBeArray(), null]),
  customer: expect.any(String),
  customer_address: expect.toBeOneOf([expect.toBeObject(), null]),
  customer_email: expect.any(String),
  customer_name: expect.toBeOneOf([expect.any(String), null]),
  customer_phone: expect.toBeOneOf([expect.any(String), null]),
  customer_shipping: expect.toBeOneOf([expect.toBeObject, null]),
  customer_tax_exempt: expect.any(String),
  customer_tax_ids: expect.toBeOneOf([expect.toBeArray(), null]),
  default_payment_method: expect.toBeOneOf([expect.any(String), null]),
  default_source: expect.toBeOneOf([expect.any(String), null]),
  default_tax_rates: expect.toBeOneOf([expect.toBeArray(), null]),
  description: expect.toBeOneOf([expect.any(String), null]),
  discount: expect.toBeOneOf([expect.toBeObject(), null]),
  discounts: expect.toBeOneOf([expect.toBeArray(), null]),
  due_date: expect.toBeOneOf([expect.any(Number), null]),
  effective_at: expect.any(Number),
  ending_balance: expect.any(Number),
  footer: expect.toBeOneOf([expect.any(String), null]),
  from_invoice: expect.toBeOneOf([expect.toBeObject(), null]),
  hosted_invoice_url: expect.any(String),
  invoice_pdf: expect.any(String),
  issuer: expect.toBeObject(),
  last_finalization_error: expect.toBeOneOf([expect.toBeObject(), null]),
  latest_revision: expect.toBeOneOf([expect.any(String), null]),
  lines: expect.toBeObject(),
  livemode: expect.any(Boolean),
  metadata: expect.toBeObject(),
  next_payment_attempt: expect.toBeOneOf([expect.any(Number), null]),
  number: expect.any(String),
  on_behalf_of: expect.toBeOneOf([expect.any(String), null]),
  paid: expect.any(Boolean),
  paid_out_of_band: expect.any(Boolean),
  parent: expect.toBeObject(),
  payment_intent: expect.any(String),
  payment_settings: expect.toBeObject(),
  period_end: expect.any(Number),
  period_start: expect.any(Number),
  post_payment_credit_notes_amount: expect.any(Number),
  pre_payment_credit_notes_amount: expect.any(Number),
  quote: expect.toBeOneOf([expect.any(String), null]),
  receipt_number: expect.toBeOneOf([expect.any(String), null]),
  rendering: expect.toBeOneOf([expect.toBeObject(), null]),
  rendering_options: expect.toBeOneOf([expect.toBeObject(), undefined]),
  shipping_cost: expect.toBeOneOf([expect.toBeObject(), null]),
  shipping_details: expect.toBeOneOf([expect.toBeObject(), null]),
  starting_balance: expect.any(Number),
  statement_descriptor: expect.toBeOneOf([expect.any(String), null]),
  status: expect.any(String),
  status_transitions: expect.toBeObject(),
  subscription: expect.any(String),
  subscription_details: expect.toBeObject(),
  subtotal: expect.any(Number),
  subtotal_excluding_tax: expect.any(Number),
  tax: expect.toBeOneOf([expect.any(Number), null]),
  test_clock: expect.toBeOneOf([expect.any(String), null]),
  total: expect.any(Number),
  total_discount_amounts: expect.toBeOneOf([expect.toBeArray(), null]),
  total_excluding_tax: expect.any(Number),
  total_pretax_credit_amounts: expect.toBeOneOf([expect.toBeArray(), null]),
  total_tax_amounts: expect.toBeArray(),
  total_taxes: expect.toBeArray(),
  transfer_data: expect.toBeOneOf([expect.toBeObject(), null]),
  webhooks_delivered_at: expect.toBeOneOf([expect.any(Number), null]),
};

const stripeInvoiceSchema: PaginatedSubscriptionInvoice = {
  first: expect.any(String),
  last: expect.any(String),
  hasMore: expect.any(Boolean),
  data: [invoiceSchema],
};

const stripePaymentMethodSchema = {
  id: expect.any(String),
  object: expect.any(String),
  allow_redisplay: expect.any(String),
  billing_details: expect.objectContaining({
    address: {
      city: expect.toBeOneOf([expect.any(String), null]),
      country: expect.toBeOneOf([expect.any(String), null]),
      line1: expect.toBeOneOf([expect.any(String), null]),
      line2: expect.toBeOneOf([expect.any(String), null]),
      postal_code: expect.toBeOneOf([expect.any(String), null]),
      state: expect.toBeOneOf([expect.any(String), null]),
    },
    email: expect.toBeOneOf([expect.any(String), null]),
    name: expect.toBeOneOf([expect.any(String), null]),
    phone: expect.toBeOneOf([expect.any(String), null]),
  }),
  card: expect.objectContaining({
    brand: expect.any(String),
    checks: {
      address_line1_check: expect.toBeOneOf([expect.any(String), null]),
      address_postal_code_check: expect.toBeOneOf([expect.any(String), null]),
      cvc_check: expect.any(String),
    },
    country: expect.any(String),
    display_brand: expect.any(String),
    exp_month: expect.any(Number),
    exp_year: expect.any(Number),
    fingerprint: expect.any(String),
    funding: expect.any(String),
    generated_from: expect.toBeOneOf([expect.any(String), null]),
    last4: expect.any(String),
    networks: expect.objectContaining({
      available: expect.toBeArray(),
      preferred: expect.toBeOneOf([expect.any(String), null]),
    }),
    three_d_secure_usage: expect.objectContaining({ supported: expect.any(Boolean) }),
    wallet: expect.toBeOneOf([expect.any(String), null]),
  }),
  created: expect.any(Number),
  customer: expect.any(String),
  livemode: expect.any(Boolean),
  metadata: expect.toBeObject(),
  type: expect.any(String),
};

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

import prismaClient from '../../../test-utils/prisma/prisma-client';
import Salable, { Version } from '../..';
import { Plan, Subscription } from '../../types';
import { TestDbData } from '../../../test-utils/scripts/create-test-data';
import { StripeData } from '../../../test-utils/stripe/create-stripe-test-data';
import getEndTime from '../../../test-utils/helpers/get-end-time';

const { db: testUuids, stripeEnvs } = global as unknown as { db: TestDbData, stripeEnvs: StripeData }

const subscriptionUuid = '04c4bada-7133-4829-a27c-8e5b00558b9e';
const basicSubscriptionUuid = '71e785df-949e-4c7d-9cdf-4dc5ad31beb3';
const proSubscriptionUuid = '2cf747da-f522-4b35-83ca-d1626cbc2448';
const perSeatSubscriptionUuid = '73d02935-4c48-43d2-9b76-a9258920045e';
const licenseUuid = 'be01faf6-2ced-4036-8df2-69eeb4f6321d';
const licenseTwoUuid = '0988c051-206d-4814-9241-f590f554bafc';
const licenseThreeUuid = '19e1e237-9c4a-4499-bdc9-34e4787aeefe';
const perSeatBasicLicenseUuids = [
  "264e98fb-38c6-48cd-aa77-5b6b631fbc95",
  "1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c",
  "e52d47a0-0fee-4740-8dbd-7bef88800e7c",
  "28362f68-d919-4a3a-bada-b868a104bd37",
  "a4326ad0-5e1d-41ba-a6e0-5dec408acf97",
  "80b36154-3d49-47b2-b99a-1c59698c14db",
];
const testGrantee = '123456';
const testEmail = 'tester@domain.com';

describe('Subscriptions V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  beforeAll(async () => {
    await generateTestData();
  });

  it('getAll: Should successfully fetch subscriptions', async () => {
    const data = await salable.subscriptions.getAll();

    expect(data).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([subscriptionSchema]),
    });
  });

  it('getAll (w/ search params): Should successfully fetch subscriptions', async () => {
    const dataWithSearchParams = await salable.subscriptions.getAll({
      status: 'ACTIVE',
      take: '3',
      email: testEmail,
      expand: ['plan'],
    });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([{ ...subscriptionSchema, plan: planSchema }]),
    });
    expect(dataWithSearchParams.data.length).toEqual(3);
    expect(dataWithSearchParams.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...subscriptionSchema,
          status: 'ACTIVE',
          email: testEmail,
          plan: planSchema,
        }),
      ]),
    );
  });

  it('getOne: Should successfully fetch the specified subscription', async () => {
    const data = await salable.subscriptions.getOne(subscriptionUuid);

    expect(data).toEqual(subscriptionSchema);
    expect(data).not.toHaveProperty('plan');
  });

  it('getOne (w/ search params): Should successfully fetch the specified subscription', async () => {
    const dataWithSearchParams = await salable.subscriptions.getOne(subscriptionUuid, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual({ ...subscriptionSchema, plan: planSchema });
    expect(dataWithSearchParams).toHaveProperty('plan', planSchema);
  });

  it('getInvoices: Should successfully fetch a subscriptions invoices', async () => {
    const data = await salable.subscriptions.getInvoices(subscriptionUuid);

    expect(data).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      hasMore: expect.any(Boolean),
      data: expect.arrayContaining([stripeInvoiceSchema]),
    });
  });

  it('getSwitchablePlans: Should successfully fetch a subscriptions switchable plans', async () => {
    const data = await salable.subscriptions.getSwitchablePlans(subscriptionUuid);

    expect(data).toEqual(expect.arrayContaining([planSchema]));
  });

  it('getUpdatePaymentLink: Should successfully fetch a subscriptions payment link', async () => {
    const data = await salable.subscriptions.getUpdatePaymentLink(subscriptionUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getPortalLink: Should successfully fetch a subscriptions portal link', async () => {
    const data = await salable.subscriptions.getPortalLink(subscriptionUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getCancelSubscriptionLink: Should successfully fetch a subscriptions cancel link', async () => {
    const data = await salable.subscriptions.getCancelSubscriptionLink(subscriptionUuid);

    expect(data).toEqual(expect.objectContaining({ url: expect.any(String) }));
  });

  it('getPaymentMethod: Should successfully fetch a subscriptions payment method', async () => {
    const data = await salable.subscriptions.getPaymentMethod(subscriptionUuid);

    expect(data).toEqual(expect.objectContaining(stripePaymentMethodSchema));
  });

  it('changePlan: Should successfully change a subscriptions plan', async () => {
    const data = await salable.subscriptions.changePlan('b3a2d3d0-968a-434a-bc99-d95a827a8f3e', {
      planUuid: 'cee50a36-c012-4a78-8e1a-b2bab93830ba',
    });

    expect(data).toBeUndefined();
  });

  it('addSeats: Should successfully add seats to the subscription', async () => {
    const data = await salable.subscriptions.addSeats(perSeatSubscriptionUuid, {
      increment: 1,
    });

    expect(data).toEqual(expect.objectContaining({ eventUuid: expect.any(String) }));
  });

  it('removeSeats: Should successfully remove seats from a subscription', async () => {
    const data = await salable.subscriptions.removeSeats(perSeatSubscriptionUuid, {
      decrement: 1,
    });

    expect(data).toEqual(expect.objectContaining({ eventUuid: expect.any(String) }));
  });

  it('cancel: Should successfully cancel the subscription', async () => {
    const data = await salable.subscriptions.cancel(subscriptionUuid, { when: 'now' });

    expect(data).toBeUndefined();
  });
});

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
  currencies: expect.toBeOneOf([expect.anything(), undefined]),
};

const subscriptionSchema: Subscription = {
  uuid: expect.any(String),
  paymentIntegrationSubscriptionId: expect.any(String),
  productUuid: expect.any(String),
  type: expect.any(String), // Todo: use enum type
  isTest: expect.any(Boolean),
  cancelAtPeriodEnd: expect.any(Boolean),
  email: expect.toBeOneOf([expect.any(String), null]),
  organisation: expect.any(String),
  quantity: expect.any(Number),
  status: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  expiryDate: expect.any(String),
  lineItemIds: expect.toBeOneOf([expect.toBeArray(), null]),
  planUuid: expect.any(String),
};

const stripeInvoiceSchema = {
  id: expect.any(String),
  object: expect.any(String),
  account_country: expect.any(String),
  account_name: expect.any(String),
  account_tax_ids: expect.toBeOneOf([expect.toBeArray(), null]),
  amount_due: expect.any(Number),
  amount_paid: expect.any(Number),
  amount_remaining: expect.any(Number),
  amount_shipping: expect.any(Number),
  application: expect.any(String),
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
  payment_intent: expect.any(String),
  payment_settings: expect.toBeObject(),
  period_end: expect.any(Number),
  period_start: expect.any(Number),
  post_payment_credit_notes_amount: expect.any(Number),
  pre_payment_credit_notes_amount: expect.any(Number),
  quote: expect.toBeOneOf([expect.any(String), null]),
  receipt_number: expect.toBeOneOf([expect.any(String), null]),
  rendering: expect.toBeOneOf([expect.toBeObject(), null]),
  rendering_options: expect.toBeOneOf([expect.toBeObject(), null]),
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
  transfer_data: expect.toBeOneOf([expect.toBeObject(), null]),
  webhooks_delivered_at: expect.any(Number),
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
      uuid: licenseTwoUuid,
      metadata: undefined,
      plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
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
        }
      ],
      endTime: getEndTime(1, 'years'),
    }
  });

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.basicSubscriptionLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.basicSubscriptionId,
      uuid: subscriptionUuid,
      email: testEmail,
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

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.basicSubscriptionTwoLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.basicSubscriptionIdTwo,
      uuid: basicSubscriptionUuid,
      email: testEmail,
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

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.proSubscriptionLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.proSubscriptionId,
      uuid: proSubscriptionUuid,
      email: testEmail,
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: { connect: [{ uuid: licenseThreeUuid }, { uuid: licenseTwoUuid }] },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.freeMonthlyPlanUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });

  await prismaClient.subscription.create({
    data: {
      lineItemIds: [stripeEnvs.perSeatBasicSubscriptionLineItemId],
      paymentIntegrationSubscriptionId: stripeEnvs.perSeatBasicSubscriptionId,
      uuid: perSeatSubscriptionUuid,
      email: testEmail,
      type: 'salable',
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
              }
            ],
            endTime: getEndTime(1, 'years'),
            uuid,
            granteeId: i < 2 ? `userId_${i}` : null,
            type: "perSeat",
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
};
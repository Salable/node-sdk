import Stripe from "stripe";
import createStripeCustomAccount from '../../test-utils/stripe/create-stripe-custom-account'

const STRIPE_KEY = process.env.STRIPE_KEY;
let STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID || null;

export default async function createStripeData() {
  if (!STRIPE_KEY) throw new Error('Missing STRIPE_KEY');

  const stripeCustomerEmail = 'tester@domain.com';

  type StripeData = {
    stripePaymentMethodId: string,
    stripeCustomerId: string,
    stripeProductWidgetOneId: string,
    stripePlanBasicMonthlyGbpId: string,
    stripePlanBasicYearlyGbpId: string,
    stripePlanPerSeatBasicMonthlyGbpId: string,
    stripePlanUsageProMonthlyGbpId: string,
    stripePlanUsageBasicMonthlyGbpId: string,
    stripeUsageBasicSubscriptionLineItemId: string,
    stripeUsageBasicSubscriptionId: string,
    stripePlanProMonthlyGbpId: string,
    stripePlanBasicMonthlyUsdId: string,
    stripePlanProMonthlyUsdId: string,
    stripeBasicSubscriptionId: string,
    stripeBasicSubscriptionIdTwo: string,
    stripeBasicSubscriptionLineItemId: string,
    stripeBasicSubscriptionTwoLineItemId: string,
    stripePerSeatBasicSubscriptionId: string,
    stripePerSeatBasicSubscriptionLineItemId: string,
    stripeProSubscriptionId: string,
    stripeProSubscriptionLineItemId: string,
    stripePlanPerSeatUnlimitedMonthlyGbpId: string,
    stripePlanPerSeatMaximumMonthlyGbpId: string,
    stripePlanPerSeatMinimumMonthlyGbpId: string,
    stripePlanPerSeatRangeMonthlyGbpId: string,
  }

  const obj: StripeData = {
    stripePaymentMethodId: '',
    stripeCustomerId: '',
    stripeProductWidgetOneId: '',
    stripePlanBasicMonthlyGbpId: '',
    stripePlanBasicYearlyGbpId: '',
    stripeUsageBasicSubscriptionLineItemId: '',
    stripeUsageBasicSubscriptionId: '',
    stripePlanPerSeatBasicMonthlyGbpId: '',
    stripePlanUsageBasicMonthlyGbpId: '',
    stripePlanUsageProMonthlyGbpId: '',
    stripePlanProMonthlyGbpId: '',
    stripePlanBasicMonthlyUsdId: '',
    stripePlanProMonthlyUsdId: '',
    stripeBasicSubscriptionId: '',
    stripeBasicSubscriptionIdTwo: '',
    stripeBasicSubscriptionLineItemId: '',
    stripeBasicSubscriptionTwoLineItemId: '',
    stripePerSeatBasicSubscriptionId: '',
    stripePerSeatBasicSubscriptionLineItemId: '',
    stripeProSubscriptionId: '',
    stripeProSubscriptionLineItemId: '',
    stripePlanPerSeatUnlimitedMonthlyGbpId: '',
    stripePlanPerSeatMaximumMonthlyGbpId: '',
    stripePlanPerSeatMinimumMonthlyGbpId: '',
    stripePlanPerSeatRangeMonthlyGbpId: '',
  };

  if (!STRIPE_ACCOUNT_ID) {
    const account = await createStripeCustomAccount();
    STRIPE_ACCOUNT_ID = account.id;
  }

  const stripeConnect = new Stripe(STRIPE_KEY, {
    apiVersion: "2024-09-30.acacia",
    stripeAccount: STRIPE_ACCOUNT_ID
  });

  if (!obj.stripePaymentMethodId) {
    const stripePaymentMethod = await stripeConnect.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' } as Stripe.PaymentMethodCreateParams.Card,
    });
    console.log('CREATED stripePaymentMethod');
    obj.stripePaymentMethodId = stripePaymentMethod.id
  }

  if (!obj.stripeCustomerId) {
    const stripeCustomer = await stripeConnect.customers.create({
      email: stripeCustomerEmail,
      payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripeCustomer');
    obj.stripeCustomerId = stripeCustomer.id
  }

  if (!obj.stripeProductWidgetOneId) {
    const stripeProductWidgetOne = await stripeConnect.products.create({
      name: 'Widget One',
    });
    console.log('CREATED stripeProductWidgetOne');
    obj.stripeProductWidgetOneId = stripeProductWidgetOne.id
  }

  if (!obj.stripePlanUsageProMonthlyGbpId) {
    const stripePlanUsageProMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Usage Basic',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 50,
      usage_type: 'metered'
    });
    console.log('CREATED stripePlanUsageProMonthlyGbpId');
    obj.stripePlanUsageProMonthlyGbpId = stripePlanUsageProMonthlyGbp.id
  }

  if (!obj.stripePlanUsageBasicMonthlyGbpId) {
    const stripePlanUsageBasicMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Usage Basic',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 20,
      usage_type: 'metered'
    });
    console.log('CREATED stripePlanUsageBasicMonthlyGbp');
    obj.stripePlanUsageBasicMonthlyGbpId = stripePlanUsageBasicMonthlyGbp.id
  }

  if (!obj.stripeUsageBasicSubscriptionId) {
    const stripeUsageBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.stripeCustomerId,
      items: [{
        price: obj.stripePlanUsageBasicMonthlyGbpId
      }],
      default_payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripeUsageBasicSubscription');
    obj.stripeUsageBasicSubscriptionId = stripeUsageBasicSubscription.id;
    obj.stripeUsageBasicSubscriptionLineItemId = stripeUsageBasicSubscription.items.data[0].id
  }

  if (!obj.stripePlanPerSeatBasicMonthlyGbpId) {
    const stripePlanPerSeatBasicMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Basic',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 1500
    });
    console.log('CREATED stripePlanPerSeatBasicMonthlyGbp');
    obj.stripePlanPerSeatBasicMonthlyGbpId = stripePlanPerSeatBasicMonthlyGbp.id
  }

  if (!obj.stripePlanPerSeatUnlimitedMonthlyGbpId) {
    const stripePlanPerSeatUnlimitedMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Unlimited',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 100
    });
    console.log('CREATED stripePlanPerSeatUnlimitedMonthlyGbp');
    obj.stripePlanPerSeatUnlimitedMonthlyGbpId = stripePlanPerSeatUnlimitedMonthlyGbp.id
  }

  if (!obj.stripePlanPerSeatMaximumMonthlyGbpId) {
    const stripePlanPerSeatMaximumMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Maximum',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 200
    });
    console.log('CREATED stripePlanPerSeatMaximumMonthlyGbp');
    obj.stripePlanPerSeatMaximumMonthlyGbpId = stripePlanPerSeatMaximumMonthlyGbp.id
  }

  if (!obj.stripePlanPerSeatRangeMonthlyGbpId) {
    const stripePlanPerSeatRangeMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Range',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 300
    });
    console.log('CREATED stripePlanPerSeatRangeMonthlyGbp');
    obj.stripePlanPerSeatRangeMonthlyGbpId = stripePlanPerSeatRangeMonthlyGbp.id
  }

  if (!obj.stripePlanPerSeatMinimumMonthlyGbpId) {
    const stripePlanPerSeatMinimumMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Minimum',
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 400
    });
    console.log('CREATED stripePlanPerSeatMinimumMonthlyGbp');
    obj.stripePlanPerSeatMinimumMonthlyGbpId = stripePlanPerSeatMinimumMonthlyGbp.id
  }

  if (!obj.stripePerSeatBasicSubscriptionId) {
    const stripePerSeatBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.stripeCustomerId,
      items: [{
        quantity: 3,
        price: obj.stripePlanPerSeatBasicMonthlyGbpId
      }],
      default_payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripePerSeatBasicSubscription');
    obj.stripePerSeatBasicSubscriptionId = stripePerSeatBasicSubscription.id;
    obj.stripePerSeatBasicSubscriptionLineItemId = stripePerSeatBasicSubscription.items.data[0].id
  }

  if (!obj.stripePlanBasicMonthlyGbpId) {
    const stripePlanBasicMonthlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 1000
    });
    console.log('CREATED stripePlanBasicMonthlyGbp');
    obj.stripePlanBasicMonthlyGbpId = stripePlanBasicMonthlyGbp.id
  }

  if (!obj.stripePlanBasicYearlyGbpId) {
    const stripePlanBasicYearlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 1000
    });
    console.log('CREATED stripePlanBasicYearlyGbp');
    obj.stripePlanBasicYearlyGbpId = stripePlanBasicYearlyGbp.id
  }

  if (!obj.stripePlanBasicYearlyGbpId) {
    const stripePlanBasicMonthlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "year",
      product: obj.stripeProductWidgetOneId,
      amount: 10000
    });
    console.log('CREATED stripePlanBasicMonthlyGbp');
    obj.stripePlanBasicYearlyGbpId = stripePlanBasicMonthlyGbp.id
  }

  if (!obj.stripeBasicSubscriptionId) {
    const stripeBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.stripeCustomerId,
      items: [{
        quantity: 1,
        price: obj.stripePlanBasicMonthlyGbpId
      }],
      default_payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripeBasicSubscription');
    obj.stripeBasicSubscriptionId = stripeBasicSubscription.id;
    obj.stripeBasicSubscriptionLineItemId = stripeBasicSubscription.items.data[0].id
  }

  if (!obj.stripeBasicSubscriptionIdTwo) {
    const stripeBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.stripeCustomerId,
      items: [{
        quantity: 1,
        price: obj.stripePlanBasicMonthlyGbpId
      }],
      default_payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripeBasicSubscriptionIdTwo');
    obj.stripeBasicSubscriptionIdTwo = stripeBasicSubscription.id;
    obj.stripeBasicSubscriptionTwoLineItemId = stripeBasicSubscription.items.data[0].id
  }

  if (!obj.stripePlanProMonthlyGbpId) {
    const stripePlanProGbpMonthly = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 2500
    });
    console.log('CREATED stripePlanProGbpMonthly');
    obj.stripePlanProMonthlyGbpId = stripePlanProGbpMonthly.id
  }

  if (!obj.stripeProSubscriptionId) {
    const stripeProSubscription = await stripeConnect.subscriptions.create({
      customer: obj.stripeCustomerId,
      items: [{
        quantity: 2,
        price: obj.stripePlanProMonthlyGbpId
      }],
      default_payment_method: obj.stripePaymentMethodId
    });
    console.log('CREATED stripeProSubscription');
    obj.stripeProSubscriptionId = stripeProSubscription.id;
    obj.stripeProSubscriptionLineItemId = stripeProSubscription.items.data[0].id
  }

  if (!obj.stripePlanBasicMonthlyUsdId) {
    const stripePlanBasicUsdMonthly = await stripeConnect.plans.create({
      currency: "usd",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 1000
    });
    console.log('CREATED stripePlanBasicUsdMonthly');
    obj.stripePlanBasicMonthlyUsdId = stripePlanBasicUsdMonthly.id
  }


  if (!obj.stripePlanProMonthlyUsdId) {
    const stripePlanProUsdMonthly = await stripeConnect.plans.create({
      currency: "usd",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 2500
    });
    obj.stripePlanProMonthlyUsdId = stripePlanProUsdMonthly.id;

    console.log('CREATED stripeProSubscription');
    obj.stripePlanProMonthlyUsdId = stripePlanProUsdMonthly.id
  }

  for (let i = 10; i < 10; i++) {
    await stripeConnect.invoiceItems.create({
      customer: obj.stripeCustomerId,
      subscription: obj.stripeBasicSubscriptionId,
      amount: 1000,
      currency: 'gbp',
      description: 'Charge for past period'
    });

    const invoice = await stripeConnect.invoices.create({
      customer: obj.stripeCustomerId,
      subscription: obj.stripeBasicSubscriptionId,
      auto_advance: true,
      collection_method: 'send_invoice',
      due_date: Math.floor(Date.now() / 1000) + (2592000 * (i + 1)),
    });

    await stripeConnect.invoices.finalizeInvoice(invoice.id);

    if (i < 5) await stripeConnect.invoices.pay(invoice.id);
    if (i === 6) await stripeConnect.invoices.voidInvoice(invoice.id);
    if (i === 8) await stripeConnect.invoices.voidInvoice(invoice.id);

    console.log(`Created and finalized invoice with ID: ${invoice.id}`);
  }

  return obj;
}
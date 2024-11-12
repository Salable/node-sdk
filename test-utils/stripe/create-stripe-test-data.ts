import Stripe from "stripe";
import createStripeCustomAccount from '../../test-utils/stripe/create-stripe-custom-account'
import getConsoleLoader from '../helpers/console-loading-wheel'
import { config } from 'dotenv';

config({ path: '.env.test' });

const STRIPE_KEY = process.env.STRIPE_KEY;

export default async function createStripeData() {
  if (!STRIPE_KEY) throw new Error('Missing STRIPE_KEY');

  const loadingWheel = getConsoleLoader('CREATING STRIPE ACCOUNT DATA');

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

  if (!process.env.STRIPE_ACCOUNT_ID) {
    const account = await createStripeCustomAccount();
    process.env.STRIPE_ACCOUNT_ID = account.id;
  }

  const stripeConnect = new Stripe(STRIPE_KEY, {
    apiVersion: "2024-09-30.acacia",
    stripeAccount: process.env.STRIPE_ACCOUNT_ID
  });

  if (!obj.stripePaymentMethodId) {
    const stripePaymentMethod = await stripeConnect.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' } as Stripe.PaymentMethodCreateParams.Card,
    });
    obj.stripePaymentMethodId = stripePaymentMethod.id
  }

  if (!obj.stripeCustomerId) {
    const stripeCustomer = await stripeConnect.customers.create({
      email: stripeCustomerEmail,
      payment_method: obj.stripePaymentMethodId
    });
    obj.stripeCustomerId = stripeCustomer.id
  }

  if (!obj.stripeProductWidgetOneId) {
    const stripeProductWidgetOne = await stripeConnect.products.create({
      name: 'Widget One',
    });
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
    obj.stripePlanBasicMonthlyGbpId = stripePlanBasicMonthlyGbp.id
  }

  if (!obj.stripePlanBasicYearlyGbpId) {
    const stripePlanBasicYearlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.stripeProductWidgetOneId,
      amount: 1000
    });
    obj.stripePlanBasicYearlyGbpId = stripePlanBasicYearlyGbp.id
  }

  if (!obj.stripePlanBasicYearlyGbpId) {
    const stripePlanBasicMonthlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "year",
      product: obj.stripeProductWidgetOneId,
      amount: 10000
    });
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

  }

  clearInterval(loadingWheel);

  return obj;
}
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

  const obj = {
    paymentMethodId: '',
    customerId: '',
    productWidgetOneId: '',
    planBasicMonthlyGbpId: '',
    planBasicYearlyGbpId: '',
    planPerSeatBasicMonthlyGbpId: '',
    planUsageProMonthlyGbpId: '',
    planUsageBasicMonthlyGbpId: '',
    usageBasicSubscriptionLineItemId: '',
    usageBasicSubscriptionId: '',
    planProMonthlyGbpId: '',
    planBasicMonthlyUsdId: '',
    planProMonthlyUsdId: '',
    basicSubscriptionId: '',
    basicSubscriptionIdTwo: '',
    basicSubscriptionLineItemId: '',
    basicSubscriptionTwoLineItemId: '',
    perSeatBasicSubscriptionId: '',
    perSeatBasicSubscriptionLineItemId: '',
    proSubscriptionId: '',
    proSubscriptionLineItemId: '',
    planPerSeatUnlimitedMonthlyGbpId: '',
    planPerSeatMaximumMonthlyGbpId: '',
    planPerSeatMinimumMonthlyGbpId: '',
    planPerSeatRangeMonthlyGbpId: '',
  };

  if (!process.env.STRIPE_ACCOUNT_ID) {
    const account = await createStripeCustomAccount();
    process.env.STRIPE_ACCOUNT_ID = account.id;
  }

  const stripeConnect = new Stripe(STRIPE_KEY, {
    apiVersion: "2024-10-28.acacia",
    stripeAccount: process.env.STRIPE_ACCOUNT_ID
  });

  if (!obj.paymentMethodId) {
    const stripePaymentMethod = await stripeConnect.paymentMethods.create({
      type: 'card',
      card: { token: 'tok_visa' } as Stripe.PaymentMethodCreateParams.Card,
    });
    obj.paymentMethodId = stripePaymentMethod.id
  }

  if (!obj.customerId) {
    const stripeCustomer = await stripeConnect.customers.create({
      email: stripeCustomerEmail,
      payment_method: obj.paymentMethodId
    });
    obj.customerId = stripeCustomer.id
  }

  if (!obj.productWidgetOneId) {
    const stripeProductWidgetOne = await stripeConnect.products.create({
      name: 'Widget One',
    });
    obj.productWidgetOneId = stripeProductWidgetOne.id
  }

  if (!obj.planUsageProMonthlyGbpId) {
    const stripePlanUsageProMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Usage Basic',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 50,
      usage_type: 'metered'
    });
    obj.planUsageProMonthlyGbpId = stripePlanUsageProMonthlyGbp.id
  }

  if (!obj.planUsageBasicMonthlyGbpId) {
    const stripePlanUsageBasicMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Usage Basic',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 20,
      usage_type: 'metered'
    });
    obj.planUsageBasicMonthlyGbpId = stripePlanUsageBasicMonthlyGbp.id
  }

  if (!obj.usageBasicSubscriptionId) {
    const stripeUsageBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.customerId,
      items: [{
        price: obj.planUsageBasicMonthlyGbpId
      }],
      default_payment_method: obj.paymentMethodId
    });
    obj.usageBasicSubscriptionId = stripeUsageBasicSubscription.id;
    obj.usageBasicSubscriptionLineItemId = stripeUsageBasicSubscription.items.data[0].id
  }

  if (!obj.planPerSeatBasicMonthlyGbpId) {
    const stripePlanPerSeatBasicMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Basic',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 1500
    });
    obj.planPerSeatBasicMonthlyGbpId = stripePlanPerSeatBasicMonthlyGbp.id
  }

  if (!obj.planPerSeatUnlimitedMonthlyGbpId) {
    const stripePlanPerSeatUnlimitedMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Unlimited',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 100
    });
    obj.planPerSeatUnlimitedMonthlyGbpId = stripePlanPerSeatUnlimitedMonthlyGbp.id
  }

  if (!obj.planPerSeatMaximumMonthlyGbpId) {
    const stripePlanPerSeatMaximumMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Maximum',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 200
    });
    obj.planPerSeatMaximumMonthlyGbpId = stripePlanPerSeatMaximumMonthlyGbp.id
  }

  if (!obj.planPerSeatRangeMonthlyGbpId) {
    const stripePlanPerSeatRangeMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Range',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 300
    });
    obj.planPerSeatRangeMonthlyGbpId = stripePlanPerSeatRangeMonthlyGbp.id
  }

  if (!obj.planPerSeatMinimumMonthlyGbpId) {
    const stripePlanPerSeatMinimumMonthlyGbp = await stripeConnect.plans.create({
      nickname: 'Per Seat Minimum',
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 400
    });
    obj.planPerSeatMinimumMonthlyGbpId = stripePlanPerSeatMinimumMonthlyGbp.id
  }

  if (!obj.perSeatBasicSubscriptionId) {
    const stripePerSeatBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.customerId,
      items: [{
        quantity: 3,
        price: obj.planPerSeatBasicMonthlyGbpId
      }],
      default_payment_method: obj.paymentMethodId
    });
    obj.perSeatBasicSubscriptionId = stripePerSeatBasicSubscription.id;
    obj.perSeatBasicSubscriptionLineItemId = stripePerSeatBasicSubscription.items.data[0].id
  }

  if (!obj.planBasicMonthlyGbpId) {
    const stripePlanBasicMonthlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 10000
    });
    obj.planBasicMonthlyGbpId = stripePlanBasicMonthlyGbp.id
  }

  if (!obj.planBasicYearlyGbpId) {
    const stripePlanBasicYearlyGbp = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "year",
      product: obj.productWidgetOneId,
      amount: 1000
    });
    obj.planBasicYearlyGbpId = stripePlanBasicYearlyGbp.id
  }

  if (!obj.basicSubscriptionId) {
    const stripeBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.customerId,
      items: [{
        quantity: 1,
        price: obj.planBasicMonthlyGbpId
      }],
      default_payment_method: obj.paymentMethodId
    });
    obj.basicSubscriptionId = stripeBasicSubscription.id;
    obj.basicSubscriptionLineItemId = stripeBasicSubscription.items.data[0].id
  }

  if (!obj.basicSubscriptionIdTwo) {
    const stripeBasicSubscription = await stripeConnect.subscriptions.create({
      customer: obj.customerId,
      items: [{
        quantity: 1,
        price: obj.planBasicMonthlyGbpId
      }],
      default_payment_method: obj.paymentMethodId
    });
    obj.basicSubscriptionIdTwo = stripeBasicSubscription.id;
    obj.basicSubscriptionTwoLineItemId = stripeBasicSubscription.items.data[0].id
  }

  if (!obj.planProMonthlyGbpId) {
    const stripePlanProGbpMonthly = await stripeConnect.plans.create({
      currency: "gbp",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 2500
    });
    obj.planProMonthlyGbpId = stripePlanProGbpMonthly.id
  }

  if (!obj.proSubscriptionId) {
    const stripeProSubscription = await stripeConnect.subscriptions.create({
      customer: obj.customerId,
      items: [{
        quantity: 2,
        price: obj.planProMonthlyGbpId
      }],
      default_payment_method: obj.paymentMethodId
    });
    obj.proSubscriptionId = stripeProSubscription.id;
    obj.proSubscriptionLineItemId = stripeProSubscription.items.data[0].id
  }

  if (!obj.planBasicMonthlyUsdId) {
    const stripePlanBasicUsdMonthly = await stripeConnect.plans.create({
      currency: "usd",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 1000
    });
    obj.planBasicMonthlyUsdId = stripePlanBasicUsdMonthly.id
  }


  if (!obj.planProMonthlyUsdId) {
    const stripePlanProUsdMonthly = await stripeConnect.plans.create({
      currency: "usd",
      interval: "month",
      product: obj.productWidgetOneId,
      amount: 2500
    });
    obj.planProMonthlyUsdId = stripePlanProUsdMonthly.id;
    obj.planProMonthlyUsdId = stripePlanProUsdMonthly.id
  }

  for (let i = 10; i < 10; i++) {
    await stripeConnect.invoiceItems.create({
      customer: obj.customerId,
      subscription: obj.basicSubscriptionId,
      amount: 1000,
      currency: 'gbp',
      description: 'Charge for past period'
    });

    const invoice = await stripeConnect.invoices.create({
      customer: obj.customerId,
      subscription: obj.basicSubscriptionId,
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

  globalThis.stripeEnvs = obj;
}
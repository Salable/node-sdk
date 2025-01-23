import Stripe from 'stripe';
import createStripeCustomAccount from '../../test-utils/stripe/create-stripe-custom-account';
import getConsoleLoader from '../helpers/console-loading-wheel';
import { config } from 'dotenv';

config({ path: '.env.test' });

const STRIPE_KEY = process.env.STRIPE_KEY;

export interface StripeEnvsTypes {
  paymentMethodId: string;
  customerId: string;
  productWidgetOneId: string;
  planBasicMonthlyGbpId: string;
  planTwoBasicMonthlyGbpId: string;
  planBasicYearlyGbpId: string;
  planPerSeatBasicMonthlyGbpId: string;
  planUsageProMonthlyGbpId: string;
  planUsageBasicMonthlyGbpId: string;
  usageBasicSubscriptionLineItemId: string;
  usageBasicSubscriptionId: string;
  planProMonthlyGbpId: string;
  planBasicMonthlyUsdId: string;
  planTwoBasicMonthlyUsdId: string;
  planProMonthlyUsdId: string;
  basicSubscriptionId: string;
  basicSubscriptionTwoId: string;
  basicSubscriptionThreeId: string;
  basicSubscriptionLineItemId: string;
  basicSubscriptionTwoLineItemId: string;
  basicSubscriptionThreeLineItemId: string;
  perSeatBasicSubscriptionId: string;
  perSeatBasicSubscriptionLineItemId: string;
  proSubscriptionId: string;
  proSubscriptionLineItemId: string;
  planPerSeatUnlimitedMonthlyGbpId: string;
  planPerSeatMaximumMonthlyGbpId: string;
  planPerSeatMinimumMonthlyGbpId: string;
  planPerSeatRangeMonthlyGbpId: string;
}

export default async function createStripeData(): Promise<StripeEnvsTypes> {
  if (!STRIPE_KEY) throw new Error('Missing STRIPE_KEY');
  const loadingWheel = getConsoleLoader('CREATING STRIPE ACCOUNT DATA');
  const stripeCustomerEmail = 'tester@domain.com';
  if (!process.env.STRIPE_ACCOUNT_ID) {
    const account = await createStripeCustomAccount();
    process.env.STRIPE_ACCOUNT_ID = account.id;
  }

  const stripeConnect = new Stripe(STRIPE_KEY, {
    apiVersion: '2023-10-16',
    stripeAccount: process.env.STRIPE_ACCOUNT_ID,
  });
  const stripePaymentMethod = await stripeConnect.paymentMethods.create({
    type: 'card',
    card: { token: 'tok_visa' },
  });
  const stripeCustomer = await stripeConnect.customers.create({
    email: stripeCustomerEmail,
    payment_method: stripePaymentMethod.id,
  });
  const stripeProductWidgetOne = await stripeConnect.products.create({
    name: 'Widget One',
  });
  const stripePlanUsageProMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Usage Basic',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 50,
    usage_type: 'metered',
  });
  const stripePlanUsageBasicMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Usage Basic',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 20,
    usage_type: 'metered',
  });
  const stripeUsageBasicSubscription = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [
      { price: stripePlanUsageBasicMonthlyGbp.id },
    ],
    default_payment_method: stripePaymentMethod.id,
  });
  const stripePlanPerSeatBasicMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Per Seat Basic',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 1500,
  });
  const stripePlanPerSeatUnlimitedMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Per Seat Unlimited',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 100,
  });
  const stripePlanPerSeatMaximumMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Per Seat Maximum',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 200,
  });
  const stripePlanPerSeatRangeMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Per Seat Range',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 300,
  });
  const stripePlanPerSeatMinimumMonthlyGbp = await stripeConnect.plans.create({
    nickname: 'Per Seat Minimum',
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 400,
  });
  const stripePerSeatBasicSubscription = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{
      quantity: 3,
      price: stripePlanPerSeatBasicMonthlyGbp.id,
    }],
    default_payment_method: stripePaymentMethod.id,
  });
  const stripePlanBasicMonthlyGbp = await stripeConnect.plans.create({
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 10000,
  });
  const stripePlanTwoBasicMonthlyGbp = await stripeConnect.plans.create({
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 10000,
  });
  const stripePlanBasicYearlyGbp = await stripeConnect.plans.create({
    currency: 'gbp',
    interval: 'year',
    product: stripeProductWidgetOne.id,
    amount: 1000,
  });
  const stripeBasicSubscription = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{
      quantity: 1,
      price: stripePlanBasicMonthlyGbp.id,
    }],
    default_payment_method: stripePaymentMethod.id,
  });
  const stripeBasicSubscriptionTwo = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{
      quantity: 1,
      price: stripePlanTwoBasicMonthlyGbp.id,
    }],
    default_payment_method: stripePaymentMethod.id,
  });
  const stripeBasicSubscriptionThree = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{
      quantity: 1,
      price: stripePlanTwoBasicMonthlyGbp.id,
    }],
    default_payment_method: stripePaymentMethod.id,
  });
  const stripePlanProGbpMonthly = await stripeConnect.plans.create({
    currency: 'gbp',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 2500,
  });
  const stripeProSubscription = await stripeConnect.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{
      quantity: 2,
      price: stripePlanProGbpMonthly.id,
    }],
    default_payment_method: stripePaymentMethod.id
  });
  const stripePlanBasicUsdMonthly = await stripeConnect.plans.create({
    currency: 'usd',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 1000,
  });
  const stripePlanTwoBasicUsdMonthly = await stripeConnect.plans.create({
    currency: 'usd',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 1000,
  });
  const stripePlanProUsdMonthly = await stripeConnect.plans.create({
    currency: 'usd',
    interval: 'month',
    product: stripeProductWidgetOne.id,
    amount: 2500,
  });
  for (let i = 10; i < 10; i++) {
    await stripeConnect.invoiceItems.create({
      customer: stripeCustomer.id,
      subscription: stripeBasicSubscription.id,
      amount: 1000,
      currency: 'gbp',
      description: 'Charge for past period',
    });
    const invoice = await stripeConnect.invoices.create({
      customer: stripeCustomer.id,
      subscription: stripeBasicSubscription.id,
      auto_advance: true,
      collection_method: 'send_invoice',
      due_date: Math.floor(Date.now() / 1000) + 2592000 * (i + 1),
    });
    await stripeConnect.invoices.finalizeInvoice(invoice.id);
    if (i < 5) await stripeConnect.invoices.pay(invoice.id);
    if (i === 6) await stripeConnect.invoices.voidInvoice(invoice.id);
    if (i === 8) await stripeConnect.invoices.voidInvoice(invoice.id);
  }
  clearInterval(loadingWheel);
  return {
    paymentMethodId: stripePaymentMethod.id,
    customerId: stripeCustomer.id,
    productWidgetOneId: stripeProductWidgetOne.id,
    planUsageProMonthlyGbpId: stripePlanUsageProMonthlyGbp.id,
    planUsageBasicMonthlyGbpId: stripePlanUsageBasicMonthlyGbp.id,
    usageBasicSubscriptionId: stripeUsageBasicSubscription.id,
    usageBasicSubscriptionLineItemId: stripeUsageBasicSubscription.items.data[0].id,
    planPerSeatBasicMonthlyGbpId: stripePlanPerSeatBasicMonthlyGbp.id,
    planPerSeatUnlimitedMonthlyGbpId: stripePlanPerSeatUnlimitedMonthlyGbp.id,
    planPerSeatMaximumMonthlyGbpId: stripePlanPerSeatMaximumMonthlyGbp.id,
    planPerSeatRangeMonthlyGbpId: stripePlanPerSeatRangeMonthlyGbp.id,
    planPerSeatMinimumMonthlyGbpId: stripePlanPerSeatMinimumMonthlyGbp.id,
    planBasicMonthlyGbpId: stripePlanBasicMonthlyGbp.id,
    planTwoBasicMonthlyGbpId: stripePlanTwoBasicMonthlyGbp.id,
    planBasicYearlyGbpId: stripePlanBasicYearlyGbp.id,
    perSeatBasicSubscriptionId: stripePerSeatBasicSubscription.id,
    perSeatBasicSubscriptionLineItemId: stripePerSeatBasicSubscription.items.data[0].id,
    basicSubscriptionId: stripeBasicSubscription.id,
    basicSubscriptionLineItemId: stripeBasicSubscription.items.data[0].id,
    basicSubscriptionTwoId: stripeBasicSubscriptionTwo.id,
    basicSubscriptionTwoLineItemId: stripeBasicSubscriptionTwo.items.data[0].id,
    basicSubscriptionThreeId: stripeBasicSubscriptionThree.id,
    basicSubscriptionThreeLineItemId: stripeBasicSubscriptionThree.items.data[0].id,
    planProMonthlyGbpId: stripePlanProGbpMonthly.id,
    planBasicMonthlyUsdId: stripePlanBasicUsdMonthly.id,
    planTwoBasicMonthlyUsdId: stripePlanTwoBasicUsdMonthly.id,
    planProMonthlyUsdId: stripePlanProUsdMonthly.id,
    proSubscriptionId: stripeProSubscription.id,
    proSubscriptionLineItemId: stripeProSubscription.items.data[0].id,
  };
}

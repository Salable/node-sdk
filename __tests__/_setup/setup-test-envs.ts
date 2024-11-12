import createStripeData from '../../test-utils/stripe/create-stripe-test-data';
import createTestData from '../../test-utils/scripts/create-test-data';
import { config } from 'dotenv';

config({ path: '.env.test' });

const globalSetup = async () => {
    await setupStripeEnvironmentVariables();
    await createTestData();
};

async function setupStripeEnvironmentVariables (){
    const stripeEnvVariables = await createStripeData();
    process.env = {
        ...process.env,
        STRIPE_PAYMENT_METHOD_ID: stripeEnvVariables.stripePaymentMethodId,
        STRIPE_CUSTOMER_ID: stripeEnvVariables.stripeCustomerId,
        STRIPE_PRODUCT_WIDGET_ONE_ID: stripeEnvVariables.stripeProductWidgetOneId,
        STRIPE_PLAN_BASIC_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanBasicMonthlyGbpId,
        STRIPE_PLAN_BASIC_YEARLY_GBP_ID: stripeEnvVariables.stripePlanBasicYearlyGbpId,
        STRIPE_PLAN_PER_SEAT_UNLIMITED_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanPerSeatUnlimitedMonthlyGbpId,
        STRIPE_PLAN_PER_SEAT_MAXIMUM_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanPerSeatMaximumMonthlyGbpId,
        STRIPE_PLAN_PER_SEAT_RANGE_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanPerSeatRangeMonthlyGbpId,
        STRIPE_PLAN_PER_SEAT_MINIMUM_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanPerSeatMinimumMonthlyGbpId,
        STRIPE_PLAN_PER_SEAT_BASIC_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanPerSeatBasicMonthlyGbpId,
        STRIPE_PLAN_USAGE_PRO_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanUsageProMonthlyGbpId,
        STRIPE_PLAN_USAGE_BASIC_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanUsageBasicMonthlyGbpId,
        STRIPE_PLAN_PRO_MONTHLY_GBP_ID: stripeEnvVariables.stripePlanProMonthlyGbpId,
        STRIPE_PLAN_BASIC_MONTHLY_USD_ID: stripeEnvVariables.stripePlanBasicMonthlyUsdId,
        STRIPE_PLAN_PRO_MONTHLY_USD_ID: stripeEnvVariables.stripePlanProMonthlyUsdId,
        STRIPE_BASIC_SUBSCRIPTION_ID: stripeEnvVariables.stripeBasicSubscriptionId,
        STRIPE_BASIC_SUBSCRIPTION_ID_TWO: stripeEnvVariables.stripeBasicSubscriptionIdTwo,
        STRIPE_BASIC_SUBSCRIPTION_LINE_ITEM_ID: stripeEnvVariables.stripeBasicSubscriptionLineItemId,
        STRIPE_BASIC_SUBSCRIPTION_TWO_LINE_ITEM_ID: stripeEnvVariables.stripeBasicSubscriptionTwoLineItemId,
        STRIPE_PER_SEAT_BASIC_SUBSCRIPTION_ID: stripeEnvVariables.stripePerSeatBasicSubscriptionId,
        STRIPE_PER_SEAT_BASIC_SUBSCRIPTION_LINE_ITEM_ID: stripeEnvVariables.stripePerSeatBasicSubscriptionLineItemId,
        STRIPE_USAGE_BASIC_SUBSCRIPTION_ID: stripeEnvVariables.stripeUsageBasicSubscriptionId,
        STRIPE_USAGE_BASIC_SUBSCRIPTION_LINE_ITEM_ID: stripeEnvVariables.stripeUsageBasicSubscriptionLineItemId,
        STRIPE_PRO_SUBSCRIPTION_ID: stripeEnvVariables.stripeProSubscriptionId,
        STRIPE_PRO_SUBSCRIPTION_LINE_ITEM_ID: stripeEnvVariables.stripeProSubscriptionLineItemId,
    };
};

export default globalSetup;
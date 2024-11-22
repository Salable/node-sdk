import 'jest-fetch-mock';
import 'jest-extended';

declare global {
  let stripeEnvs: StripeData;
}


interface StripeData {
  paymentMethodId: string,
  customerId: string,
  productWidgetOneId: string,
  planBasicMonthlyGbpId: string,
  planBasicYearlyGbpId: string,
  planPerSeatBasicMonthlyGbpId: string,
  planUsageProMonthlyGbpId: string,
  planUsageBasicMonthlyGbpId: string,
  usageBasicSubscriptionLineItemId: string,
  usageBasicSubscriptionId: string,
  planProMonthlyGbpId: string,
  planBasicMonthlyUsdId: string,
  planProMonthlyUsdId: string,
  basicSubscriptionId: string,
  basicSubscriptionIdTwo: string,
  basicSubscriptionLineItemId: string,
  basicSubscriptionTwoLineItemId: string,
  perSeatBasicSubscriptionId: string,
  perSeatBasicSubscriptionLineItemId: string,
  proSubscriptionId: string,
  proSubscriptionLineItemId: string,
  planPerSeatUnlimitedMonthlyGbpId: string,
  planPerSeatMaximumMonthlyGbpId: string,
  planPerSeatMinimumMonthlyGbpId: string,
  planPerSeatRangeMonthlyGbpId: string,
}

export {};

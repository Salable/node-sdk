import 'jest-fetch-mock';
import 'jest-extended';

declare global {
  let db: DBVariables;
}

interface DBVariables {
  organisationId: string;
  devApiKeyV2: string;
  productUuid: string;
  productTwoUuid: string;
  freeMonthlyPlanUuid: string;
  paidPlanUuid: string;
  perSeatPaidPlanUuid: string;
  paidYearlyPlanUuid: string;
  freeYearlyPlanUuid: string;
  meteredPaidPlanUuid: string;
  meteredPaidPlanTwoUuid: string;
  comingSoonPlanUuid: string;
  perSeatUnlimitedPlanUuid: string;
  perSeatMaxPlanUuid: string;
  perSeatMinPlanUuid: string;
  perSeatRangePlanUuid: string;
  currencyUuids: string;
}

export {};

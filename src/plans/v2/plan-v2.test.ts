import { initRequest, Version } from '../..';
import { v2PlanMethods } from '.';
import { Plan, PlanCapability, PlanCheckout, PlanCurrency, PlanFeature } from '../../types';

describe('Plans V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const req = initRequest(apiKey, version);
  const plansV2 = v2PlanMethods(req);

  const planUuid = '111eefac-9b21-4299-8cde-302249d6f111';

  it('getOne: should successfully fetch all products', async () => {
    const data = await plansV2.getOne(planUuid);
    expect(data).toEqual(PlanSchema);
  });

  it('getOne (w / search params): should successfully fetch a plan', async () => {
    const data = await plansV2.getOne(planUuid, { expand: ['capabilities', 'capabilities.capability', 'features', 'features.feature', 'features.enumValue', 'currencies', 'currencies.currency'] });

    expect(data).toEqual(PlanSchema);
  });

  it('getCheckoutLink (w / required params): should successfully fetch checkout link for plan', async () => {
    const data = await plansV2.getCheckoutLink(planUuid, {
      successUrl: 'https://www.salable.app',
      cancelUrl: 'https://www.salable.app',
      granteeId: 'granteeid@example.com',
      member: 'member-id',
    });

    expect(data).toEqual(PlanCheckoutLinkSchema);
  });

  it('getCheckoutLink (w / optional params): should successfully fetch checkout link for plan', async () => {
    const data = await plansV2.getCheckoutLink(planUuid, {
      successUrl: 'https://www.salable.app',
      cancelUrl: 'https://www.salable.app',
      granteeId: 'granteeid@example.com',
      member: 'member-id',
      allowPromoCode: true,
      customerEmail: 'customer@email.com',
      currency: 'GBP',
      automaticTax: '',
      changeQuantity: '1',
      requirePaymentMethod: false,
    });

    expect(data).toEqual(PlanCheckoutLinkSchema);
  });

  it('getFeatures: should successfully fetch features for plan', async () => {
    const data = await plansV2.getFeatures(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanFeatureSchema]));
  });

  it('getCapabilities: should successfully fetch capabilities for plan', async () => {
    const data = await plansV2.getCapabilities(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanCapabilitySchema]));
  });

  it('getCurrencies: should successfully fetch currencies for plan', async () => {
    const data = await plansV2.getCurrencies(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanCurrencySchema]));
  });
});

const PlanSchema: Plan = {
  uuid: expect.any(String),
  name: expect.any(String),
  description: expect.any(String),
  displayName: expect.any(String),
  slug: expect.any(String),
  status: expect.any(String),
  isTest: expect.any(Boolean),
  trialDays: expect.any(Number),
  evaluation: expect.any(Boolean),
  evalDays: expect.any(Number),
  organisation: expect.any(String),
  visibility: expect.any(String),
  licenseType: expect.any(String),
  perSeatAmount: expect.any(Number),
  maxSeatAmount: expect.any(Number),
  interval: expect.any(String),
  length: expect.any(Number),
  active: expect.any(Boolean),
  planType: expect.any(String),
  pricingType: expect.any(String),
  environment: expect.any(String),
  paddlePlanId: expect.toBeOneOf([expect.any(String), null]),
  productUuid: expect.any(String),
  salablePlan: expect.any(Boolean),
  updatedAt: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
};

const PlanCheckoutLinkSchema: PlanCheckout = {
  checkoutUrl: expect.any(String),
};

const PlanFeatureSchema: PlanFeature = {
  enumValue: expect.toBeOneOf([expect.anything(), null]),
  enumValueUuid: expect.any(String),
  feature: expect.toBeOneOf([expect.anything()]),
  featureUuid: expect.any(String),
  isUnlimited: expect.any(Boolean),
  isUsage: expect.any(Boolean),
  maxUsage: expect.any(Number),
  minUsage: expect.any(Number),
  planUuid: expect.any(String),
  pricePerUnit: expect.any(Number),
  updatedAt: expect.any(String),
  value: expect.any(String),
};

const PlanCapabilitySchema: PlanCapability = {
  planUuid: expect.any(String),
  capabilityUuid: expect.any(String),
  updatedAt: expect.any(String),
  capability: expect.toBeOneOf([expect.anything()]),
};

const PlanCurrencySchema: PlanCurrency = {
  planUuid: expect.any(String),
  currencyUuid: expect.any(String),
  price: expect.any(Number),
  paymentIntegrationPlanId: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
  currency: {
    uuid: expect.any(String),
    shortName: expect.any(String),
    longName: expect.any(String),
    symbol: expect.any(String),
  },
};

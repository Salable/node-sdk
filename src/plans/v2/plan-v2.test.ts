import Salable, { Version } from '../..';
import { Plan, PlanCapability, PlanCheckout, PlanCurrency, PlanFeature } from '../../types';

describe('Plans V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  const planUuid = '351eefac-9b21-4299-8cde-302249d6fb1e';

  it('getOne: should successfully fetch all products', async () => {
    const data = await salable.plans.getOne(planUuid);
    expect(data).toEqual(PlanSchema);
  });

  it('getOne (w / search params): should successfully fetch a plan', async () => {
    const data = await salable.plans.getOne(planUuid, { expand: ['capabilities', 'capabilities.capability', 'features', 'features.feature', 'features.enumValue', 'currencies', 'currencies.currency'] });

    expect(data).toEqual(PlanSchema);
  });

  it('getCheckoutLink (w / required params): should successfully fetch checkout link for plan', async () => {
    const data = await salable.plans.getCheckoutLink(planUuid, {
      successUrl: 'https://www.salable.app',
      cancelUrl: 'https://www.salable.app',
      granteeId: 'granteeid@example.com',
      member: 'member-id',
    });

    expect(data).toEqual(PlanCheckoutLinkSchema);
  });

  it('getCheckoutLink (w / optional params): should successfully fetch checkout link for plan', async () => {
    const data = await salable.plans.getCheckoutLink(planUuid, {
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
    const data = await salable.plans.getFeatures(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanFeatureSchema]));
  });

  it('getCapabilities: should successfully fetch capabilities for plan', async () => {
    const data = await salable.plans.getCapabilities(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanCapabilitySchema]));
  });

  it('getCurrencies: should successfully fetch currencies for plan', async () => {
    const data = await salable.plans.getCurrencies(planUuid);

    expect(data).toEqual(expect.arrayContaining([PlanCurrencySchema]));
  });
});

const PlanSchema: Plan = {
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

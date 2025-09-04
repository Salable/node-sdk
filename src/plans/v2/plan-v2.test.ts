import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { initSalable } from '../../index';
import { PlanCapabilitySchema, PlanCheckoutLinkSchema, PlanCurrencySchema, PlanFeatureSchema, PlanSchema } from '../../schemas/v2/schemas-v2';

describe('Plans V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v2');

  const planUuid = testUuids.paidPlanUuid;

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

import Salable from '../..';
import {
  PlanCheckout,
  Version
} from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import {
  PlanFeatureSchemaV3,
  OrganisationPaymentIntegrationSchemaV3, PlanCurrencySchema,
  PlanSchemaV3,
  ProductSchemaV3
} from '../../schemas/v3/schemas-v3';

describe('Plans V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const version = Version.V3;

  const salable = new Salable(apiKey, version);

  const planUuid = testUuids.paidPlanUuid;

  it('getOne: should successfully fetch one plan', async () => {
    const data = await salable.plans.getOne(planUuid);
    expect(data).toEqual(PlanSchemaV3);
  });

  it('getOne (w / search params): should successfully fetch a plan', async () => {
    const data = await salable.plans.getOne(planUuid, { expand: ['features', 'product', 'currencies'] });
    expect(data).toEqual({
      ...PlanSchemaV3,
      features: expect.arrayContaining([PlanFeatureSchemaV3]),
      product: {
        ...ProductSchemaV3,
        organisationPaymentIntegration: OrganisationPaymentIntegrationSchemaV3,
      },
      currencies: expect.arrayContaining([PlanCurrencySchema])
    });
  });

  it('getCheckoutLink (w / required params): should successfully fetch checkout link for plan', async () => {
    const data = await salable.plans.getCheckoutLink(planUuid, {
      successUrl: 'https://www.salable.app',
      cancelUrl: 'https://www.salable.app',
      granteeId: 'granteeid@example.com',
      owner: 'owner-id',
    });

    expect(data).toEqual(PlanCheckoutLinkSchema);
  });

  it('getCheckoutLink (w / optional params): should successfully fetch checkout link for plan', async () => {
    const data = await salable.plans.getCheckoutLink(planUuid, {
      successUrl: 'https://www.salable.app',
      cancelUrl: 'https://www.salable.app',
      granteeId: 'granteeid@example.com',
      owner: 'member-id',
      allowPromoCode: true,
      customerEmail: 'customer@email.com',
      currency: 'GBP',
      automaticTax: '',
      changeQuantity: '1',
      requirePaymentMethod: false,
    });

    expect(data).toEqual(PlanCheckoutLinkSchema);
  });
});

const PlanCheckoutLinkSchema: PlanCheckout = {
  checkoutUrl: expect.any(String),
};

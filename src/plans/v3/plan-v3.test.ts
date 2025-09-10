import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import {
  PlanFeatureSchemaV3,
  OrganisationPaymentIntegrationSchemaV3, PlanCurrencySchema,
  PlanSchemaV3,
  ProductSchemaV3
} from '../../schemas/v3/schemas-v3';
import { initSalable, VersionedMethodsReturn } from '../../index';
import { PlanCheckoutLinkSchema } from '../../schemas/v2/schemas-v2';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { mockProduct } from '../../../__tests__/test-mock-data/products';
import { mockPlan } from '../../../__tests__/test-mock-data/plans';
import { Product, Plan } from '@prisma/client';
import { randomUUID } from 'crypto';

describe('Plans V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV3;
  const salable = initSalable(apiKey, 'v3');
  const planUuid = testUuids.paidPlanUuid;

  describe('getAll for organisation', () => {
    const organisation = randomUUID();
    let data: {
      product: Product;
      differentProduct: Product;
      planOne: Plan;
      planTwo: Plan;
      planThree: Plan;
      differentProductPlan: Plan;
    }
    let salableGetAllPlans: VersionedMethodsReturn<'v3'>
    beforeAll(async () => {
      data = await generateTestData(organisation)
      const value = randomUUID()
      await prismaClient.apiKey.create({
        data: {
          name: 'Sample API Key',
          organisation,
          value,
          scopes: JSON.stringify(['plans:read']),
          status: 'ACTIVE',
        },
      });
      salableGetAllPlans = initSalable(value, 'v3');
    })
    it('getAll: return correct plans', async () => {
      const plans = await salableGetAllPlans.plans.getAll()
      expect(plans).toEqual(
        {
          first: data.planOne.uuid,
          last: data.planThree.uuid,
          data: [
            {
              ...PlanSchemaV3,
              uuid: data.planOne.uuid,
              slug: 'a-slug',
              productUuid: data.product.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.differentProductPlan.uuid,
              slug: 'aa-slug',
              productUuid: data.differentProduct.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.planTwo.uuid,
              slug: 'b-slug',
              productUuid: data.product.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.planThree.uuid,
              slug: 'c-slug',
              productUuid: data.product.uuid,
              archivedAt: expect.any(String) as string,
            },
          ],
        }
      );
    })

    it('getAll: return correct plans with sort desc', async () => {
      const plans = await salableGetAllPlans.plans.getAll({
        sort: 'desc'
      })
      expect(plans).toEqual(
        {
          first: data.planThree.uuid,
          last: data.planOne.uuid,
          data: [
            {
              ...PlanSchemaV3,
              uuid: data.planThree.uuid,
              slug: 'c-slug',
              productUuid: data.product.uuid,
              archivedAt: expect.any(String) as string,
            },
            {
              ...PlanSchemaV3,
              uuid: data.planTwo.uuid,
              slug: 'b-slug',
              productUuid: data.product.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.differentProductPlan.uuid,
              slug: 'aa-slug',
              productUuid: data.differentProduct.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.planOne.uuid,
              slug: 'a-slug',
              productUuid: data.product.uuid,
              archivedAt: null,
            },
          ],
        }
      );
    })
    it('getAll: return correct plans with take set', async () => {
      const plans = await salableGetAllPlans.plans.getAll({
        take: 2
      })
      expect(plans).toEqual(
        {
          first: data.planOne.uuid,
          last: data.differentProductPlan.uuid,
          data: [
            {
              ...PlanSchemaV3,
              uuid: data.planOne.uuid,
              slug: 'a-slug',
              productUuid: data.product.uuid,
              status: 'ACTIVE',
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.differentProductPlan.uuid,
              slug: 'aa-slug',
              productUuid: data.differentProduct.uuid,
              status: 'ACTIVE',
              archivedAt: null,
            },
          ],
        }
      );
    })
    it('getAll: return correct plans with productUuid, take and cursor set', async () => {
      const plans = await salableGetAllPlans.plans.getAll({
        productUuid: data.product.uuid,
        take: 2,
        cursor: data.planOne.uuid,
      })
      expect(plans).toEqual(
        {
          first: data.planTwo.uuid,
          last: data.planThree.uuid,
          data: [
            {
              ...PlanSchemaV3,
              uuid: data.planTwo.uuid,
              slug: 'b-slug',
              productUuid: data.product.uuid,
              archivedAt: null,
            },
            {
              ...PlanSchemaV3,
              uuid: data.planThree.uuid,
              slug: 'c-slug',
              productUuid: data.product.uuid,
              archivedAt: expect.any(String) as string,
            },
          ],
        }
      );
    })
    it('getAll: return correct plans with archived set', async () => {
      const plans = await salableGetAllPlans.plans.getAll({
        archived: true
      })
      expect(plans).toEqual(
        {
          first: data.planThree.uuid,
          last: data.planThree.uuid,
          data: [
            {
              ...PlanSchemaV3,
              uuid: data.planThree.uuid,
              slug: 'c-slug',
              productUuid: data.product.uuid,
              archivedAt: expect.any(String) as string,
            },
          ],
        }
      );
    })
  })

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

async function generateTestData(organisation: string) {
  const product = await prismaClient.product.create({
    data: mockProduct({ organisation }),
  });
  const differentProduct = await prismaClient.product.create({
    data: mockProduct({ organisation }),
  });
  const planOne = await prismaClient.plan.create({
    data: {
      ...mockPlan({
        organisation,
        slug: 'a-slug',
      }),
      productUuid: product.uuid,
    },
  });
  const planTwo = await prismaClient.plan.create({
    data: {
      ...mockPlan({
        organisation,
        slug: 'b-slug',
      }),
      productUuid: product.uuid,
    },
  });
  const planThree = await prismaClient.plan.create({
    data: {
      ...mockPlan({
        organisation,
        slug: 'c-slug',
        archivedAt: new Date(),
      }),
      productUuid: product.uuid,
    },
  });
  const differentProductPlan = await prismaClient.plan.create({
    data: {
      ...mockPlan({
        organisation,
        slug: 'aa-slug',
      }),
      productUuid: differentProduct.uuid,
    },
  });
  return {
    product,
    differentProduct,
    planOne,
    planTwo,
    planThree,
    differentProductPlan,
  };
}
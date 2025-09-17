import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { OrganisationPaymentIntegrationSchemaV3, ProductSchemaV3, ProductPricingTableSchemaV3 } from '../../schemas/v3/schemas-v3';
import { initSalable, VersionedMethodsReturn } from '../../index';
import { randomUUID } from 'crypto';
import { Product } from '@prisma/client';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { mockProduct } from '../../../__tests__/test-mock-data/products';

describe('Products V3 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const salable = initSalable(apiKey, 'v3');
  const productUuid = testUuids.productUuid;

  describe('getAll products for organisation', () => {
    const organisation = randomUUID();
    let data: {
      productOne: Product
      productTwo: Product
      productThree: Product
      differentOrganisationProduct: Product
    }
    let differentOrgSalable: VersionedMethodsReturn<'v3'>
    beforeAll(async () => {
      data = await generateTestData(organisation)
      const value = randomUUID()
      await prismaClient.apiKey.create({
        data: {
          name: 'Sample API Key',
          organisation,
          value,
          scopes: JSON.stringify(['products:read']),
          status: 'ACTIVE',
        },
      });
      differentOrgSalable = initSalable(value, 'v3');
    })
    it('getAll: return correct plans', async () => {
      const plans = await differentOrgSalable.products.getAll()
      expect(plans).toEqual(
        {
          first: data.productOne.uuid,
          last: data.productThree.uuid,
          data: [
            {
              ...ProductSchemaV3,
              uuid: data.productOne.uuid,
              slug: 'a-slug',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.differentOrganisationProduct.uuid,
              slug: 'aa-slug',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.productTwo.uuid,
              slug: 'b-slug',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.productThree.uuid,
              slug: 'c-slug',
              archivedAt: expect.any(String) as string,
            },
          ],
        }
      );
    })

    it('getAll: return correct plans with sort desc', async () => {
      const plans = await differentOrgSalable.products.getAll({
        sort: 'desc'
      })
      expect(plans).toEqual(
        {
          first: data.productThree.uuid,
          last: data.productOne.uuid,
          data: [
            {
              ...ProductSchemaV3,
              uuid: data.productThree.uuid,
              slug: 'c-slug',
              archivedAt: expect.any(String) as string,
            },
            {
              ...ProductSchemaV3,
              uuid: data.productTwo.uuid,
              slug: 'b-slug',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.differentOrganisationProduct.uuid,
              slug: 'aa-slug',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.productOne.uuid,
              slug: 'a-slug',
              archivedAt: null,
            },
          ],
        }
      );
    })
    it('getAll: return correct plans with take set', async () => {
      const plans = await differentOrgSalable.products.getAll({
        take: 2
      })
      expect(plans).toEqual(
        {
          first: data.productOne.uuid,
          last: data.differentOrganisationProduct.uuid,
          data: [
            {
              ...ProductSchemaV3,
              uuid: data.productOne.uuid,
              slug: 'a-slug',
              status: 'ACTIVE',
              archivedAt: null,
            },
            {
              ...ProductSchemaV3,
              uuid: data.differentOrganisationProduct.uuid,
              slug: 'aa-slug',
              status: 'ACTIVE',
              archivedAt: null,
            },
          ],
        }
      );
    })
    it('getAll: return correct plans with archived set', async () => {
      const plans = await differentOrgSalable.products.getAll({
        archived: true
      })
      expect(plans).toEqual(
        {
          first: data.productThree.uuid,
          last: data.productThree.uuid,
          data: [
            {
              ...ProductSchemaV3,
              uuid: data.productThree.uuid,
              slug: 'c-slug',
              archivedAt: expect.any(String) as string,
            },
          ],
        }
      );
    })
  })

  it('getOne: should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid);
    expect(data).toEqual(ProductSchemaV3);
  });

  it('getOne (w / search params): should successfully fetch a product', async () => {
    const data = await salable.products.getOne(productUuid, {
      expand: ['organisationPaymentIntegration'],
    });
    expect(data).toEqual({
      ...ProductSchemaV3,
      organisationPaymentIntegration: OrganisationPaymentIntegrationSchemaV3
    });
  });

  it('getPricingTable: should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid, {owner: 'xxxxx'});
    expect(data).toEqual(ProductPricingTableSchemaV3);
  });

  it('getPricingTable (w / search params): should successfully fetch a product pricing table', async () => {
    const data = await salable.products.getPricingTable(productUuid, {
      owner: 'xxxxx',
    });
    expect(data).toEqual(ProductPricingTableSchemaV3);
  });
});

async function generateTestData(organisation: string) {
  const productOne = await prismaClient.product.create({
    data: mockProduct({ organisation, slug: 'a-slug' }),
  });
  const productTwo = await prismaClient.product.create({
    data: mockProduct({ organisation, slug: 'b-slug' }),
  });
  const productThree = await prismaClient.product.create({
    data: mockProduct({ organisation, slug: 'c-slug', archivedAt: new Date() }),
  });
  const differentOrganisationProduct = await prismaClient.product.create({
    data: mockProduct({ organisation, slug: 'aa-slug' }),
  });
  return {
    productOne,
    productTwo,
    productThree,
    differentOrganisationProduct
  };
}

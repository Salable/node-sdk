import { initSalable } from '../..';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { Feature, FeatureEnumOption, Product } from '@prisma/client';
import { FeatureSchemaV3 } from '../../schemas/v3/schemas-v3';
import { EnumValueSchema } from '../../schemas/v2/schemas-v2';
import { mockFeature } from '../../../__tests__/test-mock-data/features';
import { mockProduct } from '../../../__tests__/test-mock-data/products';

describe('Features v3', () => {
  const salable = initSalable(testUuids.devApiKeyV3, 'v3')
  let product: Product;
  let booleanFeature: Feature;
  let enumFeature: Feature;
  let numberFeature: Feature;
  beforeAll(async () => {
    const data = await generateTestData(testUuids.organisationId);
    product = data.product;
    booleanFeature = data.booleanFeature;
    enumFeature = data.enumFeature;
    numberFeature = data.numberFeature;
  })
  it('getAll: return correct features', async () => {
    const features = await salable.features.getAll({
      productUuid: product.uuid,
    })
    expect(features).toEqual(
      {
        first: booleanFeature.uuid,
        last: numberFeature.uuid,
        data: [
          {
            ...FeatureSchemaV3,
            uuid: booleanFeature.uuid,
            sortOrder: 0,
            featureEnumOptions: [],
          },
          {
            ...FeatureSchemaV3,
            uuid: enumFeature.uuid,
            sortOrder: 1,
            featureEnumOptions: expect.arrayContaining([
              { ...EnumValueSchema, name: 'Option 0' },
              { ...EnumValueSchema, name: 'Option 1' },
              { ...EnumValueSchema, name: 'Option 2' },
            ]) as FeatureEnumOption[],
          },
          {
            ...FeatureSchemaV3,
            uuid: numberFeature.uuid,
            sortOrder: 2,
            featureEnumOptions: [],
          },
        ],
      },
    );
  })
  it('getAll: return correct features with sort desc', async () => {
    const features = await salable.features.getAll({
      productUuid: product.uuid,
      sort: 'desc'
    })
    expect(features).toEqual({
      first: numberFeature.uuid,
      last: booleanFeature.uuid,
      data: [
        {
          ...FeatureSchemaV3,
          uuid: numberFeature.uuid,
          sortOrder: 2,
          featureEnumOptions: [],
        },
        {
          ...FeatureSchemaV3,
          uuid: enumFeature.uuid,
          sortOrder: 1,
          featureEnumOptions: expect.arrayContaining([
            { ...EnumValueSchema, name: 'Option 0' },
            { ...EnumValueSchema, name: 'Option 1' },
            { ...EnumValueSchema, name: 'Option 2' },
          ]) as FeatureEnumOption[],
        },
        {
          ...FeatureSchemaV3,
          uuid: booleanFeature.uuid,
          sortOrder: 0,
          featureEnumOptions: [],
        },
      ],
    });
  });
  it('getAll: returns two features with take applied', async () => {
    const features = await salable.features.getAll({
      productUuid: product.uuid,
      take: 2
    })
    expect(features).toEqual({
      first: booleanFeature.uuid,
      last: enumFeature.uuid,
      data: [
        { ...FeatureSchemaV3, uuid: booleanFeature.uuid, featureEnumOptions: [] },
        {
          ...FeatureSchemaV3,
          uuid: enumFeature.uuid,
          featureEnumOptions: expect.arrayContaining([
            { ...EnumValueSchema, name: 'Option 0' },
            { ...EnumValueSchema, name: 'Option 1' },
            { ...EnumValueSchema, name: 'Option 2' },
          ]) as FeatureEnumOption[],
        },
      ],
    });
  })
  it('getAll: returns two features with take and cursor applied', async () => {
    const features = await salable.features.getAll({
      productUuid: product.uuid,
      take: 2,
      cursor: booleanFeature.uuid,
    })
    expect(features).toEqual({
      first: enumFeature.uuid,
      last: numberFeature.uuid,
      data: [
        {
          ...FeatureSchemaV3,
          uuid: enumFeature.uuid,
          featureEnumOptions: expect.arrayContaining([
            { ...EnumValueSchema, name: 'Option 0' },
            { ...EnumValueSchema, name: 'Option 1' },
            { ...EnumValueSchema, name: 'Option 2' },
          ]) as FeatureEnumOption[],
        },
        { ...FeatureSchemaV3, uuid: numberFeature.uuid, featureEnumOptions: [] },
      ],
    });
  })
});

async function generateTestData(organisation: string) {
  const product = await prismaClient.product.create({
    data: mockProduct({organisation}),
  });
  const booleanFeature = await prismaClient.feature.create({
    data: {
      ...mockFeature({ displayName: 'Boolean', valueType: 'boolean', sortOrder: 0 }),
      productUuid: product.uuid,
    },
  });
  const enumFeature = await prismaClient.feature.create({
    data: {
      ...mockFeature({ displayName: 'Boolean', valueType: 'enum', sortOrder: 1 }),
      productUuid: product.uuid,
      featureEnumOptions: {
        createMany: {
          data: Array.from({ length: 3 }, (_, i) => ({
            name: 'Option ' + i,
          })),
        },
      },
    },
    include: { featureEnumOptions: true },
  });
  const numberFeature = await prismaClient.feature.create({
    data: {
      ...mockFeature({ displayName: 'Boolean', valueType: 'number', sortOrder: 2 }),
      productUuid: product.uuid,
    },
  });
  return {
    product,
    booleanFeature,
    enumFeature,
    numberFeature,
  };
}

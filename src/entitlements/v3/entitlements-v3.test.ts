import { addMonths } from 'date-fns';
import { initSalable } from '../..';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';

const productUuid = randomUUID();
const granteeId = randomUUID();
const featureEnumUuid = randomUUID();

describe('Entitlements v3', () => {
  const salable = initSalable(testUuids.devApiKeyV3, 'v3')
  beforeAll(async () => {
    await generateTestData()
  })
  it('check: return correct features', async () => {
    const entitlements = await salable.entitlements.check({
      granteeIds: [granteeId],
      productUuid,
    })
    expect(entitlements).toEqual({
      signature: expect.any(String),
      features: expect.arrayContaining([
        {
          expiry: expect.any(String),
          feature: 'boolean',
        },
        {
          expiry: expect.any(String),
          feature: 'plan_display_name',
        },
        {
          expiry: expect.any(String),
          feature: 'text_options:access',
        },
        {
          expiry: expect.any(String),
          feature: 'numerical:1',
        },
        {
          expiry: expect.any(String),
          feature: 'unlimited_numerical:100',
        }
      ])
    });
  })
});

const generateTestData = async () => {
  const product = await prismaClient.product.create({
    data: {
      uuid: productUuid,
      name: 'Sample Product',
      description: 'This is a sample product for testing purposes',
      logoUrl: 'https://example.com/logo.png',
      displayName: 'Sample Product',
      organisation: testUuids.organisationId,
      status: 'ACTIVE',
      paid: false,
      appType: 'CUSTOM',
      features: {
        createMany: {
          data: [
            {
              name: 'boolean',
              displayName: 'Boolean',
              sortOrder: 0,
              variableName: 'boolean',
              defaultValue: 'true',
              visibility: 'public',
              showUnlimited: false,
              status: 'ACTIVE',
              valueType: 'boolean',
            },
            {
              uuid: featureEnumUuid,
              name: 'text_options',
              displayName: 'Text options',
              sortOrder: 1,
              variableName: 'text_options',
              valueType: 'enum',
              defaultValue: 'Access',
              visibility: 'public',
              showUnlimited: false,
              status: 'ACTIVE',
            },
            {
              name: 'numerical',
              displayName: 'Numerical',
              sortOrder: 2,
              variableName: 'numerical',
              valueType: 'numerical',
              defaultValue: '50',
              visibility: 'public',
              showUnlimited: false,
              status: 'ACTIVE',
            },
            {
              name: 'unlimited_numerical',
              displayName: 'Numerical unlimited',
              sortOrder: 3,
              variableName: 'unlimited_numerical',
              valueType: 'numerical',
              defaultValue: 'unlimited',
              visibility: 'public',
              showUnlimited: false,
              status: 'ACTIVE',
            },
          ]
        },
      },
    },
    include: { features: true },
  });
  const enumOption = await prismaClient.featureEnumOption.create({
    data: {
      featureUuid: featureEnumUuid,
      name: 'Access',
    }
  })
  const plan = await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'free',
      licenseType: 'licensed',
      perSeatAmount: 1,
      name: '',
      description: '',
      slug: 'plan_display_name',
      displayName: 'Plan Display Name',
      product: { connect: { uuid: product.uuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 0,
      interval: 'month',
      length: 1,
      active: true,
      planType: 'Standard',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      features: {
        createMany: {
          data: product.features.map((f) => {
            const getValue = (name: string) => {
              switch (name) {
                case 'boolean' :
                  return 'true';
                case 'text_options':
                  return 'Access';
                case 'numerical':
                  return '1';
                case 'unlimited_numerical':
                  return '100'
                default:
                  throw new Error('Value not found')
              }
            }
            return {
              value: getValue(f.name),
              featureUuid: f.uuid,
              ...(f.name === 'text_options' && { enumValueUuid: enumOption.uuid })
            };
          }),
        },
      },
    },
  });
  await prismaClient.subscription.create({
    data: {
      lineItemIds: [],
      paymentIntegrationSubscriptionId: randomUUID(),
      email: 'tester@testing.com',
      type: 'none',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      productUuid,
      planUuid: plan.uuid,
      createdAt: new Date(),
      owner: randomUUID(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          purchaser: 'tester@testing.com',
          metadata: undefined,
          paymentService: 'ad-hoc',
          granteeId,
          type: 'licensed',
          planUuid: plan.uuid,
          productUuid,
          capabilities: [],
          endTime: addMonths(new Date(), 1)
        }
      }
    }
  })
};

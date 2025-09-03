import prismaClient from '../../test-utils/prisma/prisma-client';
import { generateKeyPairSync, randomUUID } from 'crypto';
import kmsSymmetricEncrypt from '../kms/kms-symmetric-encrypt';
import getConsoleLoader from '../helpers/console-loading-wheel';
import { config } from 'dotenv';
import { StripeEnvsTypes } from './create-stripe-test-data';
import { addMonths } from 'date-fns';
import * as console from 'node:console';

config({ path: '.env.test' });

export type TestDbData = {
  organisationId: string;
  devApiKeyV2: string;
  productUuid: string;
  productTwoUuid: string;
  freeMonthlyPlanUuid: string;
  paidPlanUuid: string;
  paidPlanTwoUuid: string;
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
  usageBasicMonthlyPlanUuid: string;
  usageProMonthlyPlanUuid: string;
  subscriptionWithInvoicesUuid: string;
  couponSubscriptionUuidV2: string;
  couponSubscriptionUuidV3: string;
  currencyUuids: {
    gbp: string;
    usd: string;
  };
};

export const testUuids: TestDbData = {
  organisationId: 'c3016597-7677-415f-967e-e45643719141',
  devApiKeyV2: 'bc4fcc73-de0f-4f65-ab19-ef76cf50f3d1',
  productUuid: '2a5d3e36-45db-46ff-967e-b969b20718eb',
  productTwoUuid: '5472a373-ce9c-4723-a467-35cce0bc71f5',
  freeMonthlyPlanUuid: 'cc46dafa-cb0b-4409-beb8-5b111cb71133',
  paidPlanUuid: 'f95ffb48-9df5-4cc0-9c0c-c425fb2876d0',
  paidPlanTwoUuid: '0d2babfd-ab28-4d74-a5bb-6ed6f55e2675',
  perSeatPaidPlanUuid: '2fc9e0c4-eb8d-4abd-8a66-b14b51e20915',
  paidYearlyPlanUuid: 'b7964b46-a8bd-44ec-bd86-7225b6fcd384',
  freeYearlyPlanUuid: '60cd5764-0543-4d47-a6a9-08dde004d263',
  meteredPaidPlanUuid: 'da9585e1-6cdd-4f70-9a84-7f433e53601a',
  meteredPaidPlanTwoUuid: 'b67c2d2b-40ef-4ce8-b70c-e81286dc467a',
  comingSoonPlanUuid: 'c65e0952-6df4-4b9b-89f8-85538a87be04',
  perSeatUnlimitedPlanUuid: '0f7518a9-c834-4e87-afcc-d3d9918c737b',
  perSeatMaxPlanUuid: 'e9c8499a-0ab2-4cc0-bbbd-f60c4f0b3684',
  perSeatMinPlanUuid: '060a6454-ca08-4796-b141-d70e5bbcc834',
  perSeatRangePlanUuid: '65399089-76df-4cb7-b983-0efeae2976bf',
  usageBasicMonthlyPlanUuid: 'f21c1c62-5421-4276-82f7-e44653aff400',
  usageProMonthlyPlanUuid: '8ee7a446-b9bc-4e8c-93aa-8d9571a13707',
  currencyUuids: {
    gbp: '4efd9bde-61a6-4306-aed6-04a473496cf7',
    usd: '6ec1a282-07b3-4716-bc3c-678c40b5d98e'
  },
  subscriptionWithInvoicesUuid: 'b37357c6-bad1-4a6a-8c79-06935c66384f',
  couponSubscriptionUuidV2: '893cd5cb-b313-4e8a-8e54-35781e7b0669',
  couponSubscriptionUuidV3: 'd5b45c18-2a84-49c5-a099-2b2422fd1b80'
};

const features = [
  {
    name: 'boolean',
    displayName: 'Boolean',
    sortOrder: 0,
    variableName: 'boolean',
    defaultValue: 'true',
    visibility: 'public',
    showUnlimited: false,
    status: 'ACTIVE',
  },
  {
    name: 'text options',
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
    name: 'Unlimited numerical',
    displayName: 'Numerical unlimited',
    sortOrder: 3,
    variableName: 'unlimited_numerical',
    valueType: 'numerical',
    defaultValue: 'unlimited',
    visibility: 'public',
    showUnlimited: false,
    status: 'ACTIVE',
  },
];

const capabilities = [
  {
    name: 'test_capability_1',
    status: 'ACTIVE',
    description: 'Capability description',
  },
  {
    name: 'test_capability_2',
    status: 'ACTIVE',
    description: 'Capability description',
  },
  {
    name: 'test_capability_3',
    status: 'ACTIVE',
    description: 'Capability description',
  },
];

const apiKeyScopesV2 = [
  'events:read',
  'licenses:read',
  'licenses:write',
  'billing:read',
  'billing:write',
  'organisations:read',
  'organisations:write',
  'subscriptions:read',
  'subscriptions:write',
  'write:usage',
  'pricing-tables:read',
  'plans:read',
  'currencies:read',
  'capabilities:read',
  'features:read',
  'products:read',
  'sessions:write',
  'usage:read',
  'usage:write',
];

const { publicKey, privateKey } = generateKeyPairSync('ec', {
  namedCurve: 'P-256',
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

export default async function createSalableTestData(stripeEnvs: StripeEnvsTypes) {
  const loadingWheel = getConsoleLoader('CREATING TEST DATA');
  const encryptedPrivateKey = await kmsSymmetricEncrypt(privateKey);

  await prismaClient.currency.create({
    data: {
      uuid: testUuids.currencyUuids.gbp,
      shortName: 'USD',
      longName: 'United States Dollar',
      symbol: '$',
    },
  });

  await prismaClient.currency.create({
    data: {
      uuid: testUuids.currencyUuids.usd,
      shortName: 'GBP',
      longName: 'British Pound',
      symbol: '£',
    },
  });

  await prismaClient.organisation.create({
    data: {
      clerkOrgId: testUuids.organisationId,
      salablePlanUuid: testUuids.organisationId,
      svixAppId: testUuids.organisationId,
      logoUrl: 'https://example.com/xxxxx.png',
      billingEmailId: 'xxxxx',
      addressDetails: {},
      signingKeys: {
        create: {
          publicKey,
          privateKey: Buffer.from(encryptedPrivateKey),
        },
      },
    },
  });

  await prismaClient.apiKey.create({
    data: {
      name: 'Sample API Key',
      organisation: testUuids.organisationId,
      value: testUuids.devApiKeyV2,
      scopes: JSON.stringify(apiKeyScopesV2),
      status: 'ACTIVE',
    },
  });

  const product = await prismaClient.product.create({
    data: {
      name: 'Sample Product',
      description: 'This is a sample product for testing purposes',
      logoUrl: 'https://example.com/logo.png',
      displayName: 'Sample Product',
      organisation: testUuids.organisationId,
      status: 'ACTIVE',
      paid: false,
      appType: 'CUSTOM',
      uuid: testUuids.productUuid,
      organisationPaymentIntegration: {
        create: {
          organisation: testUuids.organisationId,
          accountId: process.env.STRIPE_ACCOUNT_ID,
          accountName: 'Widgy Widgets',
          integrationName: 'salable',
          status: 'active',
          accountData: {},
        },
      },
      currencies: {
        create: [
          {
            defaultCurrency: true,
            currency: { connect: { uuid: testUuids.currencyUuids.gbp } },
          },
          {
            defaultCurrency: false,
            currency: { connect: { uuid: testUuids.currencyUuids.usd } },
          },
        ],
      },
      features: {
        create: features,
      },
      capabilities: {
        create: capabilities,
      },
    },
    include: {
      features: true,
      currencies: { include: { currency: true } },
      capabilities: true,
    },
  });

  const productTwo = await prismaClient.product.create({
    data: {
      name: 'Sample Product Two',
      description: 'This is a sample product for testing purposes',
      logoUrl: 'https://example.com/logo.png',
      displayName: 'Sample Product Two',
      organisation: testUuids.organisationId,
      status: 'ACTIVE',
      paid: false,
      appType: 'CUSTOM',
      uuid: testUuids.productTwoUuid,
      organisationPaymentIntegration: {
        create: {
          organisation: testUuids.organisationId,
          accountId: process.env.STRIPE_ACCOUNT_ID,
          accountName: 'Widgy Widgets Two',
          integrationName: 'salable',
          accountData: {},
          status: 'active',
        },
      },
      currencies: {
        create: [
          {
            defaultCurrency: true,
            currency: { connect: { uuid: testUuids.currencyUuids.gbp } },
          },
        ],
      },
      features: {
        create: features,
      },
      capabilities: {
        create: capabilities,
      },
    },
    include: {
      features: true,
      currencies: { include: { currency: true } },
      capabilities: true,
    },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'perSeat',
      perSeatAmount: 2,
      name: 'Per Seat Basic Monthly Plan Name',
      description: 'Per Seat Basic Monthly Plan description',
      displayName: 'Per Seat Basic Monthly Plan Display Name',
      uuid: testUuids.perSeatPaidPlanUuid,
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
      currencies: {
        create: product.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 1500,
          paymentIntegrationPlanId: stripeEnvs.planPerSeatBasicMonthlyGbpId,
        })),
      },
      features: {
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'licensed',
      name: 'Basic Monthly Plan Name',
      description: 'Basic Monthly Plan description',
      displayName: 'Basic Monthly Plan Display Name',
      uuid: testUuids.paidPlanUuid,
      product: { connect: { uuid: product.uuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 7,
      interval: 'month',
      length: 1,
      active: true,
      planType: 'Standard',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      currencies: {
        create: product.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 1000,
          paymentIntegrationPlanId: c.currency.shortName === 'GBP' ? stripeEnvs.planBasicMonthlyGbpId : stripeEnvs.planBasicMonthlyUsdId,
        })),
      },
      features: {
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'licensed',
      name: 'Basic Monthly Plan Two Name',
      description: 'Basic Monthly Plan Two description',
      displayName: 'Basic Monthly Plan Two Display Name',
      uuid: testUuids.paidPlanTwoUuid,
      product: { connect: { uuid: product.uuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 7,
      interval: 'month',
      length: 1,
      active: true,
      planType: 'Standard',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      currencies: {
        create: product.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 1000,
          paymentIntegrationPlanId: c.currency.shortName === 'GBP' ? stripeEnvs.planTwoBasicMonthlyGbpId : stripeEnvs.planTwoBasicMonthlyUsdId,
        })),
      },
      features: {
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'free',
      licenseType: 'licensed',
      name: 'Free Monthly Plan Name',
      description: 'Free Monthly Plan description',
      displayName: 'Free Monthly Plan Display Name',
      uuid: testUuids.freeMonthlyPlanUuid,
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
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'licensed',
      name: 'Basic Yearly Plan Name',
      description: 'Basic Yearly Plan description',
      displayName: 'Basic Yearly Plan Display Name',
      uuid: testUuids.paidYearlyPlanUuid,
      product: { connect: { uuid: product.uuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 0,
      interval: 'year',
      length: 1,
      active: true,
      planType: 'Standard',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      currencies: {
        create: product.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 1000,
          paymentIntegrationPlanId: stripeEnvs.planBasicYearlyGbpId,
        })),
      },
      features: {
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'free',
      licenseType: 'licensed',
      name: 'Free Yearly Plan Name',
      description: 'Free Yearly Plan description',
      displayName: 'Free Yearly Plan Display Name',
      uuid: testUuids.freeYearlyPlanUuid,
      product: { connect: { uuid: product.uuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 0,
      interval: 'year',
      length: 1,
      active: true,
      planType: 'Standard',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      features: {
        create: product.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'metered',
      name: 'Usage Basic Monthly Plan Name',
      description: 'Usage Basic Monthly Plan description',
      displayName: 'Usage Basic Monthly Plan Display Name',
      uuid: testUuids.meteredPaidPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 20,
          paymentIntegrationPlanId: stripeEnvs.planUsageBasicMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'metered',
      name: 'Usage Pro Monthly Plan Name',
      description: 'Usage Pro Monthly Plan description',
      displayName: 'Usage Pro Monthly Plan Display Name',
      uuid: testUuids.meteredPaidPlanTwoUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 50,
          paymentIntegrationPlanId: stripeEnvs.planUsageProMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'free',
      licenseType: 'licensed',
      name: 'Future Plan Name',
      description: 'Future Plan description',
      displayName: 'Future Plan Display Name',
      uuid: testUuids.comingSoonPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
      status: 'ACTIVE',
      trialDays: 0,
      evaluation: false,
      evalDays: 0,
      interval: 'month',
      length: 1,
      active: true,
      planType: 'Coming soon',
      environment: 'dev',
      paddlePlanId: null,
      maxSeatAmount: -1,
      visibility: 'public',
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'perSeat',
      name: 'Per Seat Unlimited Plan',
      description: 'Per Seat Unlimited Plan description',
      displayName: 'Per Seat Unlimited Plan',
      uuid: testUuids.perSeatUnlimitedPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 1,
      maxSeatAmount: -1,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 100,
          paymentIntegrationPlanId: stripeEnvs.planPerSeatUnlimitedMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'perSeat',
      name: 'Per Seat Maximum Plan',
      description: 'Per Seat Maximum Plan description',
      displayName: 'Per Seat Maximum Plan',
      uuid: testUuids.perSeatMaxPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 1,
      maxSeatAmount: 5,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 100,
          paymentIntegrationPlanId: stripeEnvs.planPerSeatMaximumMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'perSeat',
      name: 'Per Seat Minimum Plan',
      description: 'Per Seat Minimum Plan description',
      displayName: 'Per Seat Minimum Plan',
      uuid: testUuids.perSeatMinPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 10,
      maxSeatAmount: -1,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 400,
          paymentIntegrationPlanId: stripeEnvs.planPerSeatMinimumMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'perSeat',
      name: 'Per Seat Range Plan',
      description: 'Per Seat Range Plan description',
      displayName: 'Per Seat Range Plan',
      uuid: testUuids.perSeatRangePlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 6,
      maxSeatAmount: 10,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 100,
          paymentIntegrationPlanId: stripeEnvs.planPerSeatRangeMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'metered',
      name: 'Usage Basic Monthly Plan Name',
      description: 'Usage Basic Monthly Plan description',
      displayName: 'Usage Basic Monthly Plan Display Name',
      uuid: testUuids.usageBasicMonthlyPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 6,
      maxSeatAmount: 10,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 20,
          paymentIntegrationPlanId: stripeEnvs.planUsageBasicMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.plan.create({
    data: {
      organisation: testUuids.organisationId,
      pricingType: 'paid',
      licenseType: 'metered',
      name: 'Usage Pro Monthly Plan Name',
      description: 'Usage Pro Monthly Plan description',
      displayName: 'Usage Pro Monthly Plan Display Name',
      uuid: testUuids.usageProMonthlyPlanUuid,
      product: { connect: { uuid: testUuids.productTwoUuid } },
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
      perSeatAmount: 6,
      maxSeatAmount: 10,
      visibility: 'public',
      currencies: {
        create: productTwo.currencies.map((c) => ({
          currency: { connect: { uuid: c.currencyUuid } },
          price: 50,
          paymentIntegrationPlanId: stripeEnvs.planUsageProMonthlyGbpId,
        })),
      },
      features: {
        create: productTwo.features.map((f) => ({
          feature: { connect: { uuid: f.uuid } },
          enumValue: {
            create: { name: 'Access', feature: { connect: { uuid: f.uuid } } },
          },
          value: getFeatureValue(f.variableName!),
          isUnlimited: undefined as boolean | undefined,
          isUsage: undefined as boolean | undefined,
          pricePerUnit: 10,
          minUsage: 1,
          maxUsage: 100,
        })),
      },
    },
    include: { features: { include: { feature: true, enumValue: true } } },
  });

  await prismaClient.capabilitiesOnPlans.createMany({
    data: [
      { capabilityUuid: product.capabilities[0].uuid, planUuid: testUuids.paidPlanUuid },
      { capabilityUuid: product.capabilities[0].uuid, planUuid: testUuids.freeMonthlyPlanUuid },
      {
        capabilityUuid: product.capabilities[0].uuid,
        planUuid: testUuids.paidYearlyPlanUuid,
      },
      { capabilityUuid: product.capabilities[0].uuid, planUuid: testUuids.freeYearlyPlanUuid },
      {
        capabilityUuid: product.capabilities[0].uuid,
        planUuid: testUuids.perSeatPaidPlanUuid,
      },
    ],
  });

  await prismaClient.subscription.create({
    data: {
      uuid: testUuids.subscriptionWithInvoicesUuid,
      organisation: testUuids.organisationId,
      type: 'salable',
      status: 'ACTIVE',
      paymentIntegrationSubscriptionId: stripeEnvs.subscriptionWithInvoicesId,
      lineItemIds: [stripeEnvs.subscriptionWithInvoicesLineItemId],
      productUuid: testUuids.productUuid,
      planUuid: testUuids.paidPlanUuid,
      owner: 'xxxxx',
      quantity: 1,
      createdAt: new Date(),
      expiryDate: addMonths(new Date(), 1),
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: null,
          paymentService: 'salable',
          purchaser: 'xxxxx',
          type: 'licensed',
          plan: { connect: { uuid: testUuids.paidPlanUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: new Date(),
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      }
    }
  })

  const v2CouponSubscription = await prismaClient.subscription.create({
    data: {
      uuid: testUuids.couponSubscriptionUuidV2,
      paymentIntegrationSubscriptionId: stripeEnvs.subscriptionWithCouponV2Id,
      lineItemIds: [stripeEnvs.subscriptionWithCouponV2LineItemId],
      email: 'customer@email.com',
      owner: 'xxxxx',
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: null,
          paymentService: 'salable',
          purchaser: 'xxxxx',
          type: 'licensed',
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: new Date(),
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });

  const v3CouponSubscription = await prismaClient.subscription.create({
    data: {
      uuid: testUuids.couponSubscriptionUuidV3,
      paymentIntegrationSubscriptionId: stripeEnvs.subscriptionWithCouponV3Id,
      lineItemIds: [stripeEnvs.subscriptionWithCouponV3LineItemId],
      email: 'customer@email.com',
      owner: 'xxxxx',
      type: 'salable',
      status: 'ACTIVE',
      organisation: testUuids.organisationId,
      license: {
        create: {
          name: null,
          email: null,
          status: 'ACTIVE',
          granteeId: null,
          paymentService: 'salable',
          purchaser: 'xxxxx',
          type: 'licensed',
          plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
          product: { connect: { uuid: testUuids.productUuid } },
          startTime: new Date(),
          capabilities: [],
          endTime: addMonths(new Date(), 1),
        }
      },
      product: { connect: { uuid: testUuids.productUuid } },
      plan: { connect: { uuid: testUuids.paidPlanTwoUuid } },
      createdAt: new Date(),
      updatedAt: new Date(),
      expiryDate: new Date(Date.now() + 31536000000),
    },
  });

  clearInterval(loadingWheel);
}

function getFeatureValue(variableName: string) {
  switch (variableName) {
    case 'unlimited_numerical':
      return 'Unlimited';
    case 'numerical':
      return '100';
    case 'enum':
      return 'Access';
    case 'boolean':
      return 'true';
    default:
      return '';
  }
}

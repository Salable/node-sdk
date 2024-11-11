import prismaClient from "../../test-utils/prisma/prisma-client";
import { generateKeyPairSync } from "crypto";
import kmsSymmetricEncrypt from "../kms/kms-symmetric-encrypt";

const testOrganisationId = "test-org";
const devApiKeyV2 = "dddf2aa585c285478dae404803335c0013e795aa";
const testProductUuid = '29c9a7c8-9a41-4e87-9e7e-7c62d293c131';
const testProductTwoUuid = "2e0ac383-ee7e-44ba-90cb-ab3eabd56722";
const testFreeMonthlyPlanUuid = '5a866dba-20c9-466f-88ac-e05c8980c90b';
const testPaidPlanUuid = "351eefac-9b21-4299-8cde-302249d6fb1e";
const testPerSeatPaidPlanUuid = "cee50a36-c012-4a78-8e1a-b2bab93830ba";
const testPaidYearlyPlanUuid = "111eefac-9b21-4299-8cde-302249d6f111";
const testFreeYearlyPlanUuid = "22266dba-20c9-466f-88ac-e05c8980c222";
const testMeteredPaidPlanUuid = "a770ac97-4a36-4815-870c-396586b2d565";
const testMeteredPaidPlanTwoUuid = "07cebad1-e2dc-44e0-8585-1ba4c91c032b";
const testComingSoonPlanUuid = "50238f96-4f2e-4fe9-a9a2-f2e917ae78bf";
const testPerSeatUnlimitedPlanUuid = "cab9b1b0-4b0f-4d6e-9dbb-a647ef1f8834";
const testPerSeatMaxPlanUuid = "fe8c96eb-88ea-4261-876c-951cec530e63";
const testPerSeatMinPlanUuid = "9cbaf4e7-166a-447d-91ed-662b569b111d";
const testPerSeatRangePlanUuid = "4606094a-0cec-40f3-b733-10cf65fdd5ce";
const testCurrencyUuids = {
    gbp: 'b1b12bc9-6da7-4fd9-97e5-401d996c261c',
    usd: '6ebfb42a-a78b-481c-bd79-9e857b432af9'
};

const testFeatures = [
    {
        uuid: '501767b4-1583-4475-b2b5-c98e35de217c',
        name: "boolean",
        displayName: "Boolean",
        sortOrder: 0,
        variableName: "boolean",
        defaultValue: "true",
        visibility: 'public',
        showUnlimited: false,
        status: 'ACTIVE'
    },
    {
        uuid: '24aba9db-9112-4b23-9e2f-7f1ac161169f',
        name: "text options",
        displayName: "Text options",
        sortOrder: 1,
        variableName: "text_options",
        valueType: "enum",
        defaultValue: "Access",
        visibility: 'public',
        showUnlimited: false,
        status: 'ACTIVE'
    },
    {
        uuid: '19f5d888-12d9-48a7-988f-0c2ceccf6dff',
        name: "numerical",
        displayName: "Numerical",
        sortOrder: 2,
        variableName: "numerical",
        valueType: "numerical",
        defaultValue: "50",
        visibility: 'public',
        showUnlimited: false,
        status: 'ACTIVE'
    },
    {
        uuid: '45a1304a-dab8-40ef-a7ca-c0b3593544b5',
        name: "Unlimited numerical",
        displayName: "Numerical unlimited",
        sortOrder: 3,
        variableName: "unlimited_numerical",
        valueType: "numerical",
        defaultValue: "unlimited",
        visibility: 'public',
        showUnlimited: false,
        status: 'ACTIVE'
    }
];

const testCapabilities = [
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
    }
];

const apiKeyScopesV2 = [
    "events:read",
    "licenses:read",
    "licenses:write",
    "billing:read",
    "billing:write",
    "organisations:read",
    "organisations:write",
    "subscriptions:read",
    "subscriptions:write",
    "write:usage",
    "pricing-tables:read",
    "plans:read",
    "currencies:read",
    "capabilities:read",
    "features:read",
    "products:read",
    "sessions:write",
];

const { publicKey, privateKey } = generateKeyPairSync("ec", {
    namedCurve: "P-256",
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

export default async function createTestData() {
    const encryptedPrivateKey = await kmsSymmetricEncrypt(privateKey);

    await prismaClient.organisation.create({
        data: {
            clerkOrgId: testOrganisationId,
            salablePlanUuid: testOrganisationId,
            svixAppId: testOrganisationId,
            logoUrl: "https://example.com/xxxxx.png",
            billingEmailId: "xxxxx",
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
            organisation: testOrganisationId,
            value: devApiKeyV2,
            scopes: JSON.stringify(apiKeyScopesV2),
            status: 'ACTIVE'
        },
    });

    const product = await prismaClient.product.create({
        data: {
            name: 'Sample Product',
            description: 'This is a sample product for testing purposes',
            logoUrl: 'https://example.com/logo.png',
            displayName: 'Sample Product',
            organisation: 'xxxxx',
            status: 'ACTIVE',
            paid: false,
            appType: 'CUSTOM',
            isTest: false,
            uuid: testProductUuid,
            organisationPaymentIntegration: {
                create: {
                    organisation: testOrganisationId,
                    accountId: process.env.STRIPE_ACCOUNT_ID,
                    accountName: "Widgy Widgets",
                    integrationName: "salable",
                    isTest: true,
                    accountData: {},
                },
            },
            currencies: {
                create: [
                    {
                        defaultCurrency: true,
                        currency: { connect: { uuid: testCurrencyUuids.gbp } },
                    },
                    {
                        defaultCurrency: false,
                        currency: { connect: { uuid: testCurrencyUuids.usd } },
                    },
                ],
            },
            features: { create: testFeatures },
            capabilities: {
                create: testCapabilities,
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
            organisation: 'xxxxx',
            status: 'ACTIVE',
            paid: false,
            appType: 'CUSTOM',
            isTest: false,
            uuid: testProductTwoUuid,
            organisationPaymentIntegration: {
                create: {
                    organisation: testOrganisationId,
                    accountId: process.env.STRIPE_ACCOUNT_ID,
                    accountName: "Widgy Widgets Two",
                    integrationName: "salable",
                    isTest: true,
                    accountData: {},
                },
            },
            currencies: {
                create: [
                    {
                        defaultCurrency: true,
                        currency: { connect: { uuid: testCurrencyUuids.gbp } },
                    },
                ],
            },
            features: { create: testFeatures },
            capabilities: {
                create: testCapabilities,
            },
        },
        include: {
            features: true,
            currencies: { include: { currency: true } },
            capabilities: true,
        },
    });

    const perSeatBasicMonthlyPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            perSeatAmount: 2,
            name: "Per Seat Basic Monthly Plan Name",
            description: "Per Seat Basic Monthly Plan description",
            displayName: "Per Seat Basic Monthly Plan Display Name",
            uuid: testPerSeatPaidPlanUuid,
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_PER_SEAT_BASIC_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: product.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const basicMonthlyPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "licensed",
            name: "Basic Monthly Plan Name",
            description: "Basic Monthly Plan description",
            displayName: "Basic Monthly Plan Display Name",
            uuid: testPaidPlanUuid,
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
                    paymentIntegrationPlanId: c.currency.shortName === "GBP"
                        ? process.env.STRIPE_PLAN_BASIC_MONTHLY_GBP_ID
                        : process.env.STRIPE_PLAN_BASIC_MONTHLY_USD_ID,
                })),
            },
            features: {
                create: product.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const freeMonthlyPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Free Monthly Plan Name",
            description: "Free Monthly Plan description",
            displayName: "Free Monthly Plan Display Name",
            uuid: testFreeMonthlyPlanUuid,
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
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const basicYearlyPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "licensed",
            name: "Basic Yearly Plan Name",
            description: "Basic Yearly Plan description",
            displayName: "Basic Yearly Plan Display Name",
            uuid: testPaidYearlyPlanUuid,
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
                    paymentIntegrationPlanId: c.currency.shortName === "GBP"
                        ? process.env.STRIPE_PLAN_BASIC_YEARLY_GBP_ID
                        : process.env.STRIPE_PLAN_BASIC_YEARLY_USD_ID,
                })),
            },
            features: {
                create: product.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const freeYearlyPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Free Yearly Plan Name",
            description: "Free Yearly Plan description",
            displayName: "Free Yearly Plan Display Name",
            uuid: testFreeYearlyPlanUuid,
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
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const usagePlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "metered",
            name: "Usage Basic Monthly Plan Name",
            description: "Usage Basic Monthly Plan description",
            displayName: "Usage Basic Monthly Plan Display Name",
            uuid: testMeteredPaidPlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_USAGE_BASIC_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const usagePlanTwo = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "metered",
            name: "Usage Pro Monthly Plan Name",
            description: "Usage Pro Monthly Plan description",
            displayName: "Usage Pro Monthly Plan Display Name",
            uuid: testMeteredPaidPlanTwoUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_USAGE_PRO_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const comingSoonPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Future Plan Name",
            description: "Future Plan description",
            displayName: "Future Plan Display Name",
            uuid: testComingSoonPlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
            status: 'ACTIVE',
            trialDays: 0,
            evaluation: false,
            evalDays: 0,
            interval: 'month',
            length: 1,
            active: true,
            planType: "Coming soon",
            environment: 'dev',
            paddlePlanId: null,
            maxSeatAmount: -1,
            visibility: 'public',
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const perSeatUnlimittedPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Unlimited Plan",
            description: "Per Seat Unlimited Plan description",
            displayName: "Per Seat Unlimited Plan",
            uuid: testPerSeatUnlimitedPlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_PER_SEAT_UNLIMITED_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const perSeatMaximumPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Maximum Plan",
            description: "Per Seat Maximum Plan description",
            displayName: "Per Seat Maximum Plan",
            uuid: testPerSeatMaxPlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_PER_SEAT_MAXIMUM_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const perSeatMinimumPlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Minimum Plan",
            description: "Per Seat Minimum Plan description",
            displayName: "Per Seat Minimum Plan",
            uuid: testPerSeatMinPlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_PER_SEAT_MINIMUM_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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

    const perSeatRangePlan = await prismaClient.plan.create({
        data: {
            organisation: testOrganisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Range Plan",
            description: "Per Seat Range Plan description",
            displayName: "Per Seat Range Plan",
            uuid: testPerSeatRangePlanUuid,
            product: { connect: { uuid: testProductTwoUuid } },
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
                    paymentIntegrationPlanId: process.env.STRIPE_PLAN_PER_SEAT_RANGE_MONTHLY_GBP_ID,
                })),
            },
            features: {
                create: productTwo.features.map((f) => ({
                    feature: { connect: { uuid: f.uuid } },
                    enumValue: {
                        create: { name: "Access", feature: { connect: { uuid: f.uuid } } },
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
}

function getFeatureValue(variableName: string) {
    switch (variableName) {
        case "unlimited_numerical":
            return "Unlimited";
        case "numerical":
            return "100";
        case "enum":
            return "Access";
        case "boolean":
            return "true";
        default:
            return "";
    }
}
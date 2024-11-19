import prismaClient from "../../test-utils/prisma/prisma-client";
import { generateKeyPairSync } from "crypto";
import kmsSymmetricEncrypt from "../kms/kms-symmetric-encrypt";
import getConsoleLoader from "../helpers/console-loading-wheel";
import { config } from 'dotenv';
import { StripeData } from "../stripe/create-stripe-test-data";

config({ path: '.env.test' });

export type TestDbData = {
    organisationId: string,
    devApiKeyV2: string,
    productUuid: string,
    productTwoUuid: string,
    freeMonthlyPlanUuid: string,
    paidPlanUuid: string,
    perSeatPaidPlanUuid: string,
    paidYearlyPlanUuid: string,
    freeYearlyPlanUuid: string,
    meteredPaidPlanUuid: string,
    meteredPaidPlanTwoUuid: string,
    comingSoonPlanUuid: string,
    perSeatUnlimitedPlanUuid: string,
    perSeatMaxPlanUuid: string,
    perSeatMinPlanUuid: string,
    perSeatRangePlanUuid: string,
    currencyUuids: {
        gbp: string
        usd: string
    }
};

const organisationId = "test-org";
const devApiKeyV2 = "dddf2aa585c285478dae404803335c0013e795aa";
const productUuid = '29c9a7c8-9a41-4e87-9e7e-7c62d293c131';
const productTwoUuid = "2e0ac383-ee7e-44ba-90cb-ab3eabd56722";
const freeMonthlyPlanUuid = '5a866dba-20c9-466f-88ac-e05c8980c90b';
const paidPlanUuid = "351eefac-9b21-4299-8cde-302249d6fb1e";
const perSeatPaidPlanUuid = "cee50a36-c012-4a78-8e1a-b2bab93830ba";
const paidYearlyPlanUuid = "111eefac-9b21-4299-8cde-302249d6f111";
const freeYearlyPlanUuid = "22266dba-20c9-466f-88ac-e05c8980c222";
const meteredPaidPlanUuid = "a770ac97-4a36-4815-870c-396586b2d565";
const meteredPaidPlanTwoUuid = "07cebad1-e2dc-44e0-8585-1ba4c91c032b";
const comingSoonPlanUuid = "50238f96-4f2e-4fe9-a9a2-f2e917ae78bf";
const perSeatUnlimitedPlanUuid = "cab9b1b0-4b0f-4d6e-9dbb-a647ef1f8834";
const perSeatMaxPlanUuid = "fe8c96eb-88ea-4261-876c-951cec530e63";
const perSeatMinPlanUuid = "9cbaf4e7-166a-447d-91ed-662b569b111d";
const perSeatRangePlanUuid = "4606094a-0cec-40f3-b733-10cf65fdd5ce";
const currencyUuids = {
    gbp: 'b1b12bc9-6da7-4fd9-97e5-401d996c261c',
    usd: '6ebfb42a-a78b-481c-bd79-9e857b432af9'
};

const features = [
    {
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
    const { stripeEnvs } = global as unknown as { stripeEnvs: StripeData }

    const loadingWheel = getConsoleLoader('CREATING TEST DATA');

    const encryptedPrivateKey = await kmsSymmetricEncrypt(privateKey);

    await prismaClient.currency.create({
        data: {
            uuid: currencyUuids.gbp,
            shortName: 'USD',
            longName: 'United States Dollar',
            symbol: '$',
        },
    });

    await prismaClient.currency.create({
        data: {
            uuid: currencyUuids.usd,
            shortName: 'GBP',
            longName: 'British Pound',
            symbol: '£',
        },
    });

    await prismaClient.organisation.create({
        data: {
            clerkOrgId: organisationId,
            salablePlanUuid: organisationId,
            svixAppId: organisationId,
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
            organisation: organisationId,
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
            organisation: organisationId,
            status: 'ACTIVE',
            paid: false,
            appType: 'CUSTOM',
            isTest: false,
            uuid: productUuid,
            organisationPaymentIntegration: {
                create: {
                    organisation: organisationId,
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
                        currency: { connect: { uuid: currencyUuids.gbp } },
                    },
                    {
                        defaultCurrency: false,
                        currency: { connect: { uuid: currencyUuids.usd } },
                    },
                ],
            },
            features: {
                create: features
            },
            capabilities: {
                create: capabilities
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
            organisation: organisationId,
            status: 'ACTIVE',
            paid: false,
            appType: 'CUSTOM',
            isTest: false,
            uuid: productTwoUuid,
            organisationPaymentIntegration: {
                create: {
                    organisation: organisationId,
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
                        currency: { connect: { uuid: currencyUuids.gbp } },
                    },
                ],
            },
            features: {
                create: features
            },
            capabilities: {
                create: capabilities
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
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            perSeatAmount: 2,
            name: "Per Seat Basic Monthly Plan Name",
            description: "Per Seat Basic Monthly Plan description",
            displayName: "Per Seat Basic Monthly Plan Display Name",
            uuid: perSeatPaidPlanUuid,
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "licensed",
            name: "Basic Monthly Plan Name",
            description: "Basic Monthly Plan description",
            displayName: "Basic Monthly Plan Display Name",
            uuid: paidPlanUuid,
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
                        ? stripeEnvs.planBasicMonthlyGbpId
                        : stripeEnvs.planBasicMonthlyUsdId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Free Monthly Plan Name",
            description: "Free Monthly Plan description",
            displayName: "Free Monthly Plan Display Name",
            uuid: freeMonthlyPlanUuid,
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "licensed",
            name: "Basic Yearly Plan Name",
            description: "Basic Yearly Plan description",
            displayName: "Basic Yearly Plan Display Name",
            uuid: paidYearlyPlanUuid,
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
                    paymentIntegrationPlanId: stripeEnvs.planBasicYearlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Free Yearly Plan Name",
            description: "Free Yearly Plan description",
            displayName: "Free Yearly Plan Display Name",
            uuid: freeYearlyPlanUuid,
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "metered",
            name: "Usage Basic Monthly Plan Name",
            description: "Usage Basic Monthly Plan description",
            displayName: "Usage Basic Monthly Plan Display Name",
            uuid: meteredPaidPlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planUsageBasicMonthlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "metered",
            name: "Usage Pro Monthly Plan Name",
            description: "Usage Pro Monthly Plan description",
            displayName: "Usage Pro Monthly Plan Display Name",
            uuid: meteredPaidPlanTwoUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planUsageProMonthlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "free",
            licenseType: "licensed",
            name: "Future Plan Name",
            description: "Future Plan description",
            displayName: "Future Plan Display Name",
            uuid: comingSoonPlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Unlimited Plan",
            description: "Per Seat Unlimited Plan description",
            displayName: "Per Seat Unlimited Plan",
            uuid: perSeatUnlimitedPlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planPerSeatUnlimitedMonthlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Maximum Plan",
            description: "Per Seat Maximum Plan description",
            displayName: "Per Seat Maximum Plan",
            uuid: perSeatMaxPlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planPerSeatMaximumMonthlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Minimum Plan",
            description: "Per Seat Minimum Plan description",
            displayName: "Per Seat Minimum Plan",
            uuid: perSeatMinPlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planPerSeatMinimumMonthlyGbpId
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

    await prismaClient.plan.create({
        data: {
            organisation: organisationId,
            pricingType: "paid",
            licenseType: "perSeat",
            name: "Per Seat Range Plan",
            description: "Per Seat Range Plan description",
            displayName: "Per Seat Range Plan",
            uuid: perSeatRangePlanUuid,
            product: { connect: { uuid: productTwoUuid } },
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
                    paymentIntegrationPlanId: stripeEnvs.planPerSeatRangeMonthlyGbpId
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

    await prismaClient.capabilitiesOnPlans.createMany({
        data: [
            { capabilityUuid: product.capabilities[0].uuid, planUuid: paidPlanUuid },
            { capabilityUuid: product.capabilities[0].uuid, planUuid: freeMonthlyPlanUuid },
            {
                capabilityUuid: product.capabilities[0].uuid,
                planUuid: paidYearlyPlanUuid,
            },
            { capabilityUuid: product.capabilities[0].uuid, planUuid: freeYearlyPlanUuid },
            {
                capabilityUuid: product.capabilities[0].uuid,
                planUuid: perSeatPaidPlanUuid,
            },
        ],
    });

    global.db = {
        organisationId,
        devApiKeyV2,
        productUuid,
        productTwoUuid,
        freeMonthlyPlanUuid,
        paidPlanUuid,
        perSeatPaidPlanUuid,
        paidYearlyPlanUuid,
        freeYearlyPlanUuid,
        meteredPaidPlanUuid,
        meteredPaidPlanTwoUuid,
        comingSoonPlanUuid,
        perSeatUnlimitedPlanUuid,
        perSeatMaxPlanUuid,
        perSeatMinPlanUuid,
        perSeatRangePlanUuid,
        currencyUuids
    };

    clearInterval(loadingWheel);
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
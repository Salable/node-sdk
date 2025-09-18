import objectBuilder from './object-builder';
import { PaymentIntegration, PaymentIntegrationStatus } from '@prisma/client';

export const mockProduct = objectBuilder({
  name: 'Sample Product',
  description: 'This is a sample product for testing purposes',
  logoUrl: 'https://example.com/logo.png',
  displayName: 'Sample Product',
  organisation: 'xxxxx',
  slug: 'example-slug',
  status: 'ACTIVE',
  paid: false,
  appType: 'CUSTOM', // deprecated
  isTest: false,
  archivedAt: null as null | Date,
});

export const mockOrganisationPaymentIntegration = objectBuilder({
  organisation: 'xxxxx',
  integrationName: 'stripe_existing' as PaymentIntegration,
  accountData: { // deprecated
    key: 'xxxxx',
    encryptedData: 'xoxox',
  },
  isTest: false,
  accountName: 'Account Name',
  accountId: 'acc_1234',
  status: PaymentIntegrationStatus.active,
});

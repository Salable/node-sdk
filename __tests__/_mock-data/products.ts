import objectBuilder from './object-builder';
import { PaymentIntegration, PaymentIntegrationStatus } from '@prisma/client';

export const mockProduct = objectBuilder({
  name: 'Test Product',
  description: 'This is a test product for testing only',
  logoUrl: 'https://example.com/logo.png',
  displayName: 'Test Product',
  organisation: 'xxxxx',
  slug: 'example-slug',
  status: 'ACTIVE',
  paid: false,
  appType: 'CUSTOM',
  isTest: false,
});

export const mockOrganisationPaymentIntegration = objectBuilder({
  organisation: 'xxxxx',
  integrationName: 'stripe_existing' as PaymentIntegration,
  accountData: {
    key: 'xxxxx',
    encryptedData: 'xoxox',
  },
  isTest: false,
  accountName: 'Account Name',
  accountId: 'acc_1234',
  status: PaymentIntegrationStatus.active,
});

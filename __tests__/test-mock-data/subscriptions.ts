import objectBuilder from './object-builder';
import { randomUUID } from 'crypto';
import { PaymentIntegration } from '@prisma/client';

export const mockSubscription = objectBuilder({
  type: 'salable' as PaymentIntegration,
  paymentIntegrationSubscriptionId: randomUUID(),
  email: null as string | null,
  owner: 'xxxxx',
  organisation: 'xxxxx',
  status: 'ACTIVE',
  createdAt: new Date(),
  updatedAt: new Date(),
  expiryDate: new Date(Date.now() + 31536000000),
  lineItemIds: ['xxxxx'] as string[] | undefined,
  isTest: false,
  quantity: 1,
  cancelAtPeriodEnd: false,
});

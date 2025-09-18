import { LicensesUsageRecordType, Prisma } from '@prisma/client';
import objectBuilder from './object-builder';

// deprecated
export const mockLicenseCapability = objectBuilder({
  name: 'Export',
  uuid: '38e63e2a-1269-4e9d-b712-28cfbf087285',
  status: 'ACTIVE',
  updatedAt: '2022-10-17T11:41:11.626Z',
  description: null as string | null,
  productUuid: 'c32f26e4-21d9-4456-a1f0-7e76039af518',
});

export const mockLicenseUsageRecord = objectBuilder({
  unitCount: 0,
  type: 'current' as LicensesUsageRecordType,
  resetAt: null as Date | null,
  recordedAt: null as Date | null,
});

export const mockLicense = objectBuilder({
  name: null as string | null,
  email: null as string | null,
  status: 'ACTIVE',
  granteeId: '123456' as string | null,
  paymentService: 'ad-hoc',
  purchaser: 'tester@testing.com',
  type: 'licensed',
  metadata: undefined as undefined | { member: string; granteeId: string },
  capabilities: [
    mockLicenseCapability({ name: 'CapabilityOne' }),
    mockLicenseCapability({ name: 'CapabilityTwo' }),
  ] as Prisma.InputJsonObject[], // deprecated
  startTime: undefined as undefined | Date,
  endTime: new Date(),
  cancelAtPeriodEnd: false,
  isTest: false,
});

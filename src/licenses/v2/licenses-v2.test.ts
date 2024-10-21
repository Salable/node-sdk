// licenses-v2.test.ts

import { Version, initRequest } from '../..';
import { v2LicenseMethods } from '.';
import { log } from 'console';

describe('Licenses V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const req = initRequest(apiKey, version);
  const licensesV2 = v2LicenseMethods(req);

  const cancellableLicenseUuid = '48cdd0ee-2954-436e-ad10-39cd418e5b2d';
  const cancellableLicenseUuidTwo = '9868b62f-84af-46f9-8a3e-c43db31243ce';
  const cancellableLicenseUuidThree = '67b913c2-2713-4d6a-a106-a44e773fc15d';

  it('getAll: Should succesfully fetch licenses', async () => {
    const data = await licensesV2.getAll();
    const dataWithSearchParams = await licensesV2.getAll({ status: 'ACTIVE', take: '3', subscriptionUuid: '04c4bada-7133-4829-a27c-8e5b00558b9e' });

    expect(data.data.length).toEqual(11);

    expect(dataWithSearchParams).toEqual(
      expect.objectContaining({
        first: expect.any(String),
        last: expect.any(String),
        data: expect.arrayContaining([licenseSchema]),
      }),
    );
    expect(dataWithSearchParams.data.length).toEqual(3);
    for (const license of dataWithSearchParams.data) {
      expect(license).toHaveProperty('status', 'ACTIVE');
    }
  });

  it('getOne: Should succesfully fetch the specified license', async () => {
    const data = await licensesV2.getOne('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c');
    const dataWithSearchParams = await licensesV2.getOne('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c', { expand: ['plan'] });

    expect(data).toEqual(expect.objectContaining(licenseSchema));
    expect(data).not.toHaveProperty('plan');

    expect(dataWithSearchParams).toEqual(expect.objectContaining(licenseSchema));
    expect(dataWithSearchParams).toHaveProperty('plan', planSchema);
  });
  it('getCount: Should succesfully fetch a subscriptions count', async () => {
    const data2 = await licensesV2.getCount();

    log(data2);

    const data = await licensesV2.getCount({ subscriptionUuid: '04c4bada-7133-4829-a27c-8e5b00558b9e', status: 'ACTIVE' });

    expect(data).toEqual(
      expect.objectContaining({
        count: expect.any(Number),
        assigned: expect.any(Number),
        unassigned: expect.any(Number),
      }),
    );
  });
  it('getForPurchaser: Should succesfully fetch a purchasers licenses', async () => {
    const data = await licensesV2.getForPurchaser({ purchaser: 'tester@testing.com', productUuid: '29c9a7c8-9a41-4e87-9e7e-7c62d293c131', status: 'ACTIVE' });

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
    for (const license of data) {
      expect(license).toHaveProperty('purchaser', 'tester@testing.com');
      expect(license).toHaveProperty('productUuid', '29c9a7c8-9a41-4e87-9e7e-7c62d293c131');
      expect(license).toHaveProperty('status', 'ACTIVE');
    }
  });
  it('getForGranteeId: Should succesfully fetch a grantees licenses', async () => {
    const data = await licensesV2.getForGranteeId('123456', { expand: ['plan'] });

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
    for (const license of data) {
      expect(license).toHaveProperty('plan', planSchema);
    }
  });
  it('create: Should succesfully create a license', async () => {
    const data = await licensesV2.create([
      {
        planUuid: '5a866dba-20c9-466f-88ac-e05c8980c90b',
        member: 'example',
        granteeId: '123456',
        status: 'ACTIVE',
        endTime: '2025-07-06T12:00:00.000Z',
      },
    ]);

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });
  it('update: Should succesfully update a license', async () => {
    const data = await licensesV2.update('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c', { granteeId: 'updated-grantee-id' });

    expect(data.granteeId).toEqual('updated-grantee-id');
  });
  it('updateMany: Should succesfully update multiple licenses', async () => {
    const data = await licensesV2.updateMany([
      {
        uuid: '1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c',
        granteeId: 'updated-grantee',
      },
      {
        uuid: '264e98fb-38c6-48cd-aa77-5b6b631fbc95',
        granteeId: 'updated-grantee',
      },
    ]);

    for (const license of data) {
      expect(license.granteeId).toEqual('updated-grantee');
    }
  });
  it('cancel: Should succesfully cancel the specified license', async () => {
    const data = await licensesV2.cancel(cancellableLicenseUuid);

    expect(data).toEqual(undefined);
  });
  it('cancelMany: Should succesfully multiple licenses', async () => {
    const data = await licensesV2.cancelMany({ uuids: [cancellableLicenseUuidTwo, cancellableLicenseUuidThree] });

    expect(data).toEqual(undefined);
  });
  it('check: Should succesfully check the specified grantees permissions', async () => {
    const data = await licensesV2.check({
      productUuid: '29c9a7c8-9a41-4e87-9e7e-7c62d293c131',
      granteeIds: ['123456'],
    });

    expect(data).toEqual(
      expect.objectContaining({
        capabilities: expect.arrayContaining([
          {
            capability: expect.any(String),
            expiry: expect.any(String),
          },
        ]),
        signature: expect.any(String),
      }),
    );
  });
  it('verify: Verifies the license-check signatures correctly', async () => {
    const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAES7jvFxC50Fe2hHd3Sn7Q8TvnxuSZ\nV8HvRHGDvFacOiESAqg3uroeNTgoT7lD4BwQ+fFsn7zig5hwncoTsrCPbw==\n-----END PUBLIC KEY-----`;
    const testLicenseCheckData = [
      { capability: 'One', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'Two', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'free_plan_name', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Three', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Four', expiry: '2024-08-14T13:32:29.313Z' },
    ];
    const testSignature = '3045022100b210aa29519f3146afe7a0d343a6b7ec5e47a1ac0de9686e2ec4cf0081e159c402206ecf98ad4d1d339c59f7ff3b4744d1f377747702c6253f7904ef6589191a2254';
    const testIncorrectSignature = 'bad-signature';

    const falseLicenseCheck = licensesV2.verify({
      publicKey: testPublicKeyPem,
      signature: testIncorrectSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });
    const trueLicenseCheck = licensesV2.verify({
      publicKey: testPublicKeyPem,
      signature: testSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });

    expect(falseLicenseCheck).toEqual(false);
    expect(trueLicenseCheck).toEqual(true);
  });
});

const licenseCapabilitySchema = {
  uuid: expect.any(String),
  productUuid: expect.any(String),
  name: expect.any(String),
  status: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  updatedAt: expect.any(String),
};

const licenseSchema = {
  uuid: expect.any(String),
  name: expect.toBeOneOf([expect.any(String), null]),
  email: expect.toBeOneOf([expect.any(String), null]),
  subscriptionUuid: expect.toBeOneOf([expect.any(String), null]),
  status: expect.toBeOneOf(['ACTIVE', 'CANCELED', 'EVALUATION', 'SCHEDULED', 'TRIALING', 'INACTIVE']),
  granteeId: expect.toBeOneOf([expect.any(String), null]),
  paymentService: expect.toBeOneOf(['ad-hoc', 'salable', 'stripe_existing']),
  purchaser: expect.any(String),
  type: expect.toBeOneOf(['licensed', 'metered', 'perSeat', 'customId', 'user']),
  productUuid: expect.any(String),
  planUuid: expect.any(String),
  capabilities: expect.arrayContaining([licenseCapabilitySchema]),
  metadata: expect.toBeOneOf([expect.anything(), null]),
  startTime: expect.any(String),
  endTime: expect.any(String),
  updatedAt: expect.any(String),
  isTest: expect.any(Boolean),
};

const planSchema = {
  uuid: expect.any(String),
  name: expect.any(String),
  slug: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  displayName: expect.any(String),
  status: expect.any(String),
  trialDays: expect.toBeOneOf([expect.any(Number), null]),
  evaluation: expect.any(Boolean),
  evalDays: expect.any(Number),
  perSeatAmount: expect.any(Number),
  maxSeatAmount: expect.any(Number),
  organisation: expect.any(String),
  visibility: expect.any(String),
  licenseType: expect.any(String),
  hasAcceptedTransaction: expect.any(Boolean),
  interval: expect.any(String),
  length: expect.any(Number),
  active: expect.any(Boolean),
  planType: expect.any(String),
  pricingType: expect.any(String),
  environment: expect.any(String),
  isTest: expect.any(Boolean),
  paddlePlanId: null,
  productUuid: expect.any(String),
  salablePlan: expect.any(Boolean),
  updatedAt: expect.any(String),
  features: expect.toBeOneOf([expect.anything(), undefined]),
};

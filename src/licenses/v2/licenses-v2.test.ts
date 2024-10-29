import { Version, initRequest } from '../..';
import { v2LicenseMethods } from '.';
import { Capability, License, Plan } from '@/src/types';

describe('Licenses V2 Tests', () => {
  const apiKey = process.env.SALABLE_TEST_API_KEY!;
  const version = Version.V2;

  const req = initRequest(apiKey, version);
  const licensesV2 = v2LicenseMethods(req);

  const testProductUuid = '29c9a7c8-9a41-4e87-9e7e-7c62d293c131';
  const testPlanUuid = '5a866dba-20c9-466f-88ac-e05c8980c90b';
  const testSubscriptionUuid = '04c4bada-7133-4829-a27c-8e5b00558b9e';
  const testPurchaser = 'tester@testing.com';
  const testGrantee = '123456';
  const cancellableLicenseUuid = '48cdd0ee-2954-436e-ad10-39cd418e5b2d';
  const cancellableLicenseUuidTwo = '9868b62f-84af-46f9-8a3e-c43db31243ce';
  const cancellableLicenseUuidThree = '67b913c2-2713-4d6a-a106-a44e773fc15d';

  it('getAll: Should successfully fetch licenses', async () => {
    const data = await licensesV2.getAll();

    expect(data).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([licenseSchema]),
    });
  });

  it('getAll (w/ search params): Should successfully fetch licenses', async () => {
    const dataWithSearchParams = await licensesV2.getAll({ status: 'ACTIVE', take: '3', subscriptionUuid: testSubscriptionUuid });

    expect(dataWithSearchParams).toEqual({
      first: expect.any(String),
      last: expect.any(String),
      data: expect.arrayContaining([licenseSchema]),
    });
    expect(dataWithSearchParams.data.length).toEqual(3);
    for (const license of dataWithSearchParams.data) {
      expect(license).toHaveProperty('status', 'ACTIVE');
    }
  });

  it('getOne: Should successfully fetch the specified license', async () => {
    const data = await licensesV2.getOne('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c');

    expect(data).toEqual(licenseSchema);
    expect(data).not.toHaveProperty('plan');
  });

  it('getOne (w/ search params): Should successfully fetch the specified license', async () => {
    const dataWithSearchParams = await licensesV2.getOne('1e97a9ea-c66a-4822-a5f1-bebf5ea7e44c', { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual({ ...licenseSchema, plan: planSchema });
    expect(dataWithSearchParams).toHaveProperty('plan', planSchema);
  });

  it('getCount: Should successfully fetch a subscriptions count', async () => {
    const data = await licensesV2.getCount();

    expect(data).toEqual({
      count: expect.any(Number),
      assigned: expect.any(Number),
      unassigned: expect.any(Number),
    });
  });

  it('getCount (w/ search params): Should successfully fetch a subscriptions count', async () => {
    const dataWithSearchParams = await licensesV2.getCount({ subscriptionUuid: testSubscriptionUuid, status: 'ACTIVE' });

    expect(dataWithSearchParams).toEqual({
      count: expect.any(Number),
      assigned: expect.any(Number),
      unassigned: expect.any(Number),
    });
  });

  it('getForPurchaser: Should successfully fetch a purchasers licenses', async () => {
    const data = await licensesV2.getForPurchaser({ purchaser: testPurchaser, productUuid: testProductUuid });

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('getForPurchaser (w/ search params): Should successfully fetch a purchasers licenses', async () => {
    const dataWithSearchParams = await licensesV2.getForPurchaser({ purchaser: testPurchaser, productUuid: testProductUuid, status: 'ACTIVE' });

    expect(dataWithSearchParams).toEqual(expect.arrayContaining([expect.objectContaining({ ...licenseSchema, status: 'ACTIVE', purchaser: testPurchaser, productUuid: testProductUuid })]));
  });

  it('getForGranteeId: Should successfully fetch a grantees licenses', async () => {
    const data = await licensesV2.getForGranteeId(testGrantee);

    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('getForGranteeId (w/ search params): Should successfully fetch a grantees licenses', async () => {
    const dataWithSearchParams = await licensesV2.getForGranteeId(testGrantee, { expand: ['plan'] });

    expect(dataWithSearchParams).toEqual(expect.arrayContaining([expect.objectContaining({ ...licenseSchema, plan: planSchema })]));
  });

  it('create: Should successfully create a license', async () => {
    const data = await licensesV2.create({
      planUuid: testPlanUuid,
      member: 'example',
      granteeId: 'test-grantee-id',
      status: 'ACTIVE',
      endTime: '2025-07-06T12:00:00.000Z',
    });

    expect(data).toEqual(expect.objectContaining(licenseSchema));
  });

  it('createMany: Should successfully create multiple licenses', async () => {
    const data = await licensesV2.createMany([
      {
        planUuid: testPlanUuid,
        member: 'example',
        granteeId: 'example-grantee-id',
        status: 'ACTIVE',
        endTime: '2025-07-06T12:00:00.000Z',
      },
      {
        planUuid: testPlanUuid,
        member: 'example',
        granteeId: 'example-other-grantee-id',
        status: 'ACTIVE',
        endTime: '2025-07-06T12:00:00.000Z',
      },
    ]);

    expect(data.length).toEqual(2);
    expect(data).toEqual(expect.arrayContaining([expect.objectContaining(licenseSchema)]));
  });

  it('update: Should successfully update a license', async () => {
    const data = await licensesV2.update(cancellableLicenseUuid, { granteeId: 'updated-grantee-id' });

    expect(data.granteeId).toEqual('updated-grantee-id');
  });

  it('updateMany: Should successfully update multiple licenses', async () => {
    const data = await licensesV2.updateMany([
      {
        uuid: cancellableLicenseUuidTwo,
        granteeId: 'updated-grantee-id',
      },
      {
        uuid: cancellableLicenseUuidThree,
        granteeId: 'updated-grantee-id',
      },
    ]);

    expect(data.length).toEqual(2);
    expect(data).toEqual(expect.arrayContaining([expect.objectContaining({ ...licenseSchema, granteeId: 'updated-grantee-id' })]));
  });

  it('cancel: Should successfully cancel the specified license', async () => {
    const data = await licensesV2.cancel(cancellableLicenseUuid);

    expect(data).toBeUndefined();
  });

  it('cancelMany: Should successfully multiple licenses', async () => {
    const data = await licensesV2.cancelMany({ uuids: [cancellableLicenseUuidTwo, cancellableLicenseUuidThree] });

    expect(data).toBeUndefined();
  });

  it('check: Should successfully check the specified grantees permissions', async () => {
    const data = await licensesV2.check({
      productUuid: testProductUuid,
      granteeIds: [testGrantee],
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

const licenseCapabilitySchema: Capability = {
  uuid: expect.any(String),
  productUuid: expect.any(String),
  name: expect.any(String),
  status: expect.any(String),
  description: expect.toBeOneOf([expect.any(String), null]),
  updatedAt: expect.any(String),
};

const licenseSchema: License = {
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

const planSchema: Plan = {
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
  paddlePlanId: expect.toBeOneOf([expect.any(String), null]),
  productUuid: expect.any(String),
  salablePlan: expect.any(Boolean),
  type: expect.toBeOneOf([expect.any(String), undefined]),
  updatedAt: expect.any(String),
  features: expect.toBeOneOf([expect.anything(), undefined]),
};

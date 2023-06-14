import { api, invalidApi } from '@/src/config';
import {
  GRANTEE_ID,
  MEMBER_ID,
  POPULATED_PLAN_UUID,
  POPULATED_PRODUCT_UUID,
} from '@/src/constants';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | check | INTEGRATION', () => {
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.check(POPULATED_PRODUCT_UUID, [GRANTEE_ID]);
  });

  it('Should throw an error when no arguments are passed to method', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.check();
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request: "productUuid" and "granteeIds" cannot be undefined');
  });

  it('Should throw an "Not Found" error when passed "productUuid" does not exist on the account but granteeIds are valid', async () => {
    async function handleFetch() {
      return await api.licenses.check('invalid-product-uuid', [GRANTEE_ID]);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  it('Should throw an error when passed "productUuid" is undefined', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.check(undefined, ['']);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request: "productUuid" cannot be undefined');
  });

  it('Should throw an error when passed "granteeIds" is undefined', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.check('product-uuid');
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request: Passed "granteeIds" are not valid, must be of type String[]');
  });

  it('Should throw an error when passed "granteeIds" is not array type', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.check('product-uuid', 'invalid-grantee-id-type');
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request: Passed "granteeIds" are not valid, must be of type String[]');
  });

  it('Should return undefined when passed "productUuid" exists on the account but granteeIds does not', async () => {
    const data = await api.licenses.check(POPULATED_PRODUCT_UUID, ['invalid-grantee-id']);

    expect(data).toBeUndefined();
  });

  it('Should return the correct data when passed valid arguments and there is an ACTIVE license', async () => {
    let createdLicense;
    try {
      createdLicense = await api.licenses.create({
        member: MEMBER_ID,
        granteeId: GRANTEE_ID,
        planUuid: POPULATED_PLAN_UUID,
      });

      const data = await api.licenses.check(POPULATED_PRODUCT_UUID, [GRANTEE_ID]);

      expect(data?.capsHashed).toEqual('Capability');
      expect(data?.capabilities).toEqual(['Capability']);
    } finally {
      await api.licenses.delete(createdLicense?.uuid || '');
    }
  });

  it('Should return undefined when passed valid arguments but there is no ACTIVE license', async () => {
    const data = await api.licenses.check(POPULATED_PRODUCT_UUID, [GRANTEE_ID]);

    expect(data).toBeUndefined();
  });
});

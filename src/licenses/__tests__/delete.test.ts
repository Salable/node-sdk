import { api, invalidApi } from '@/src/config';
import { GRANTEE_ID, MEMBER_ID, POPULATED_PLAN_UUID } from '@/src/constants';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | delete | INTEGRATION', () => {
  // 1. API Key is not valid
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.delete('');
  }, 'Forbidden');

  // 2. licenseUuid is valid and ACTIVE
  it('When given a valid licenceUuid and is ACTIVE, it should be updated to CANCELED', async () => {
    const data = await api.licenses.create({
      member: MEMBER_ID,
      granteeId: GRANTEE_ID,
      planUuid: POPULATED_PLAN_UUID,
    });

    expect(data?.status).toEqual('ACTIVE');

    await api.licenses.delete(data?.uuid || '');

    const updatedLicense = await api.licenses.getOne(data?.uuid || '');

    expect(updatedLicense?.status).toEqual('CANCELED');
  });

  // 3. licenseUuid is valid but already in status CANCELED
  it('When given a valid licenceUuid and is CANCELED, it should not fail', async () => {
    const data = await api.licenses.create({
      member: MEMBER_ID,
      granteeId: GRANTEE_ID,
      planUuid: POPULATED_PLAN_UUID,
    });

    await api.licenses.delete(data?.uuid || '');

    const canceledLicense = await api.licenses.getOne(data?.uuid || '');

    expect(canceledLicense?.status).toEqual('CANCELED');

    await api.licenses.delete(canceledLicense?.uuid || '');
  });

  // 4. licenseUuid is invalid
  it('Should throw a "Bad Request" error when passing an invalid license UUID that does not exist', async () => {
    async function handleFetch() {
      return await api.licenses.delete('some-invalid-uuid');
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request');
  });

  // 5. licenseUuid is missing
  it('Should throw an error of "Bad Request" when missing licenseUuid', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.delete();
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request');
  });
});

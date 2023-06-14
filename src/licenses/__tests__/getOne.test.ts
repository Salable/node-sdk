import { api, invalidApi } from '@/src/config';
import { GRANTEE_ID, MEMBER_ID, POPULATED_PLAN_UUID } from '@/src/constants';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | getOne | INTEGRATION', () => {
  // 1. Invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.getOne('');
  });

  // 2. Valid license UUID
  it('When given a valid license UUID it should return the data for it', async () => {
    let data;

    try {
      data = await api.licenses.create({
        member: MEMBER_ID,
        granteeId: GRANTEE_ID,
        planUuid: POPULATED_PLAN_UUID,
      });

      const fetchedLicense = await api.licenses.getOne(data?.uuid || '');

      expect(fetchedLicense?.status).toEqual('ACTIVE');
      expect(fetchedLicense?.uuid).toEqual(data?.uuid);
      expect(fetchedLicense?.endTime).toEqual(data?.endTime);
    } finally {
      await api.licenses.delete(data?.uuid || '');
    }
  });

  // 3. Invalid license UUID
  it('Should throw a "Not Found" error when passing an invalid license UUID that does not exist', async () => {
    async function handleFetch() {
      return await api.licenses.getOne('some-invalid-uuid');
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 4. Missing license UUID
  it('Should throw an error of "Not Found" when missing licenseUuid', async () => {
    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.getOne();
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });
});

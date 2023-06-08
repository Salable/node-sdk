import { api, invalidApi } from '@/src/config';
import { GRANTEE_ID, MEMBER_ID, POPULATED_PLAN_UUID } from '@/src/constants';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | getAll | INTEGRATION', () => {
  // 1. Response when no licenses found
  it('Should throw a "Not Found" error when count of licenses === 0', async () => {
    async function handleFetch() {
      return await api.licenses.getAll({ status: 'ACTIVE' });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 2. Check response with invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.getAll();
  });

  // 3. Response when there are licenses
  it('Should return an array of licenses when count > 0', async () => {
    const data = await api.licenses.getAll();

    expect(Array.isArray(data)).toBeTruthy();
    expect(data?.length).toBeGreaterThan(0);
  });

  // 4. When given ACTIVE status, only ACTIVE licenses are returned
  it('When given the ACTIVE status, all returned licenses should be ACTIVE', async () => {
    // Create two active licenses
    const createdLicenses = await Promise.all(
      Array.from({ length: 2 }).map(async () => {
        return await api.licenses.create({
          member: MEMBER_ID,
          granteeId: GRANTEE_ID,
          planUuid: POPULATED_PLAN_UUID,
        });
      })
    );

    // Get all active licenses
    try {
      const data = await api.licenses.getAll({ status: 'ACTIVE' });

      expect(Array.isArray(data)).toBeTruthy();
      expect(data).toHaveLength(2);
      expect(data?.every((license) => license.status === 'ACTIVE')).toEqual(true);
    } finally {
      // Tidy up created licenses to not impact other tests
      await Promise.all(
        createdLicenses.map(async (license) => await api.licenses.delete(license?.uuid || ''))
      );
    }
  });

  // 5. When given CANCELED status, only CANCELED licenses are returned
  it('When given the CANCELED status, all returned licenses should be CANCELED', async () => {
    const data = await api.licenses.getAll({ status: 'CANCELED' });

    expect(Array.isArray(data)).toBeTruthy();
    expect(data?.length).toBeGreaterThan(0);
    expect(data?.every((license) => license.status === 'CANCELED')).toEqual(true);
  });
});

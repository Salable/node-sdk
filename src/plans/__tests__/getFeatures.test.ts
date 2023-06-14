import { api, invalidApi } from '@/src/config';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';
import { POPULATED_PLAN_UUID, INVALID_PLAN_UUID } from '@/src/constants';

describe('Plans | getFeatures | INTEGRATION', () => {
  // 1. Not found response if invalid uuid is passed
  it('Should throw a "Not Found" error when invalid uuid is passed', async () => {
    async function handleFetch() {
      return await api.plans.getFeatures(INVALID_PLAN_UUID);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 2. Check response with invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.plans.getOne(POPULATED_PLAN_UUID);
  });

  // 3. Return all features associated with the plan
  it('Should return 1 feature', async () => {
    const data = await api.plans.getFeatures(POPULATED_PLAN_UUID);
    expect(data).toBeTruthy();
    expect(data?.length).toBe(1);
    expect(data?.[0].planUuid).toBe(POPULATED_PLAN_UUID);
  });

  // . Return plan when valid uuid is passed
});

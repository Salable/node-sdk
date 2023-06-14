import { api, invalidApi } from '@/src/config';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';
import { POPULATED_PLAN_UUID, INVALID_PLAN_UUID } from '@/src/constants';

describe('Plans | getOne | INTEGRATION', () => {
  // 1. Not found response if invalid uuid is passed
  it('Should throw a "Not Found" error when invalid uuid is passed', async () => {
    async function handleFetch() {
      return await api.plans.getOne(INVALID_PLAN_UUID);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 2. Check response with invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.plans.getOne(POPULATED_PLAN_UUID);
  });

  // 3. Return plan when valid uuid is passed
  it('Should return a plan when a uuid is passed in', async () => {
    const data = await api.plans.getOne(POPULATED_PLAN_UUID);
    expect(data).toBeTruthy();
  });
});

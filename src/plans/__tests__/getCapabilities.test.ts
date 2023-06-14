import { api, invalidApi } from '@/src/config';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';
import {
  POPULATED_PLAN_UUID,
  INVALID_PLAN_UUID,
  POPULATED_PRODUCT_CAPABILITY,
} from '@/src/constants';

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
  it('Should return 1 capability', async () => {
    const data = await api.plans.getCapabilities(POPULATED_PLAN_UUID);
    expect(data).toBeTruthy();
    expect(data?.length).toBe(1);
    expect(data?.[0].capabilityUuid).toBe(POPULATED_PRODUCT_CAPABILITY[0].uuid);
  });

  // . Return plan when valid uuid is passed
});

import { api, invalidApi } from '@/src/config';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';
import { POPULATED_PLAN_UUID, INVALID_PLAN_UUID } from '@/src/constants';

const url = 'https://testbruce.salable.app/products';

const queryParams = {
  cancelUrl: url,
  successUrl: url,
  granteeId: 'grantee-123',
  member: 'member-123',
};

describe('Plans | getCheckoutLink | INTEGRATION', () => {
  // 1. Not found response if invalid uuid is passed
  it('Should throw a "Not Found" error when invalid uuid is passed', async () => {
    async function handleFetch() {
      return await api.plans.getCheckoutLink(INVALID_PLAN_UUID, queryParams);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 2. Check response with invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.plans.getCheckoutLink(POPULATED_PLAN_UUID, queryParams);
  });

  // 3. Throw an error on free plans
  it('Should throw "Bad Request" error if free plan is passed', async () => {
    async function handleFetch() {
      return await api.plans.getCheckoutLink(POPULATED_PLAN_UUID, queryParams);
    }
    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Request');
  });
});

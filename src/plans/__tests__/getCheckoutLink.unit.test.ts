import fetch from 'jest-fetch-mock';
import { api } from '@/src/config';

const url = 'https://testbruce.salable.app/products';

const missingRequiredMember = {
  cancelUrl: url,
  successUrl: url,
  granteeId: 'grantee-123',
};

const missingRequiredgranteeId = {
  cancelUrl: url,
  successUrl: url,
  member: 'member',
};

// missing required query params, show error, should work for all required
// happy, everything passed in all good
// additional unnecessary query params, should be ignored
// planId missing, null or undefined
// planId is wrong data type
// planId doesn't exist

describe('Plans | getCheckoutLink | UNIT', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.enableMocks();
  });

  // test looping

  // If structure is wrong, what happens
  // if structure is empty {} what happens
  // do we expect error if x

  // if a key that is required is not passed, throw error message with keyName is required

  it('Should get return "Missing Required Query Params" when a member key is not passed', async () => {
    fetch.mockResponseOnce(JSON.stringify({ checkoutUrl: 'https://localhost:300' }));

    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.plans.getCheckoutLink('plan-id', missingRequiredMember);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Missing Required Query Params');
  });

  it('Should get return "Missing Required Query Params" when granteeId key is not passed', async () => {
    fetch.mockResponseOnce(JSON.stringify({ checkoutUrl: 'https://localhost:300' }));

    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.plans.getCheckoutLink('plan-id', missingRequiredgranteeId);
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Missing Required Query Params');
  });
});

// INT
// when planid undefined

// when plan id invalid

// error when qeury undefined

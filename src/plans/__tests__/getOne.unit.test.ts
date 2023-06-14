import fetch from 'jest-fetch-mock';
import { Salable } from '../../index';
import { IPlan } from '@/src/types';

const plan: IPlan = {
  uuid: 'bd2b6575-2ca0-407a-94b5-1d9c19fd5fe0',
  name: 'Plan 1',
  // description: null,
  displayName: 'Plan 1 Display Name',
  status: 'ACTIVE',
  trialDays: null,
  evaluation: false,
  evalDays: 0,
  organisation: 'org_lSQANh7rD68mQ4Zx',
  visibility: 'public',
  licenseType: 'board',
  interval: 'year',
  length: 1,
  active: true,
  planType: 'Standard',
  pricingType: 'paid',
  environment: 'stg',
  type: 'trello',
  // paddlePlanId: null,
  productUuid: 'e6d24c05-6ceb-46af-8168-2eea7f35e252',
  salablePlan: false,
  updatedAt: '2022-07-28T09:53:03.732Z',
};

describe('Plans | getOne | UNIT', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.enableMocks();
  });

  it('Should get one plan', async () => {
    fetch.mockResponseOnce(JSON.stringify(plan));

    const api = new Salable('test-key');

    const fetchedPlan = await api.plans.getOne('plan-id');
    expect(fetchedPlan?.name).toBe(plan.name);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    const api = new Salable('test-key');

    await expect(async () => {
      await api.plans.getOne('plan-id');
    }).rejects.toBe('API is down');
  });
});

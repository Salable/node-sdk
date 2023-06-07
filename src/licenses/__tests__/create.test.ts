import { Salable } from '@/src';
import {
  GRANTEE_ID,
  INVALID_PLAN_UUID,
  MEMBER_ID,
  POPULATED_PLAN_UUID,
  POPULATED_PRODUCT_CAPABILITY,
  POPULATED_PRODUCT_UUID,
  SALABLE_API_KEY,
} from '@/src/constants';

describe('Licenses | create | INTEGRATION', () => {
  // 1. API Key is not valid
  it('Should throw a "Unauthorized" error when invalid API Key is used', async () => {
    const api = new Salable('invalid-api-key');

    async function handleFetch() {
      return await api.licenses.create({
        member: '',
        granteeId: '',
        planUuid: '',
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Unauthorized');
  });

  // 2. Success test -> everything passed in okay -> InstanceOf ILicense
  it('Should create a new license with the correct data type', async () => {
    const api = new Salable(SALABLE_API_KEY);

    const data = await api.licenses.create({
      member: MEMBER_ID,
      granteeId: GRANTEE_ID,
      planUuid: POPULATED_PLAN_UUID,
    });

    const date = new Date();
    const datePlusMonth = new Date(date.setMonth(date.getMonth() + 1)).toISOString().split('T')[0];

    expect(data).toBeTruthy();
    expect(data.capabilities).toEqual(POPULATED_PRODUCT_CAPABILITY);
    expect(data.granteeId).toEqual(GRANTEE_ID);
    expect(data.purchaser).toEqual(MEMBER_ID);
    expect(data.productUuid).toEqual(POPULATED_PRODUCT_UUID);
    expect(data.planUuid).toEqual(POPULATED_PLAN_UUID);
    expect(data.status).toEqual('ACTIVE');
    expect(data.paymentService).toEqual('ad-hoc');
    expect(data.endTime.split('T')[0]).toEqual(datePlusMonth);

    // TODO: Add a call to api.licenses.delete() to remove the created license
  });

  // 3. Missing planUuid
  it('Should throw an error of "Bad Gateway" when missing planUuid', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.create({
        member: MEMBER_ID,
        granteeId: GRANTEE_ID,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Gateway');
  });

  // 4. Invalid type of planUuid
  it('Should throw an error of "Bad Gateway" when an invalid type of planUuid is passed', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      return await api.licenses.create({
        member: MEMBER_ID,
        granteeId: GRANTEE_ID,
        // eslint-disable-next-line
        // @ts-ignore
        planUuid: 12345,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Gateway');
  });

  // 4. planUuid does not exist
  it('Should throw an error of "Not Found" when planUuid does not exist', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      return await api.licenses.create({
        member: MEMBER_ID,
        granteeId: GRANTEE_ID,
        planUuid: INVALID_PLAN_UUID,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  // 5. Missing member
  it('Should throw an error of "Bad Gateway" when missing member', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      // eslint-disable-next-line
      // @ts-ignore
      return await api.licenses.create({
        granteeId: GRANTEE_ID,
        planUuid: POPULATED_PLAN_UUID,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Gateway');
  });

  // 6. Invalid member
  it('Should throw an error of "Bad Gateway" when an invalid member is passed', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      return await api.licenses.create({
        // eslint-disable-next-line
        // @ts-ignore
        member: 12345,
        granteeId: GRANTEE_ID,
        planUuid: POPULATED_PLAN_UUID,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Gateway');
  });

  // 7. Missing granteeId
  it('Should create a new license if granteeId is missing, value should be defaulted to member value', async () => {
    const api = new Salable(SALABLE_API_KEY);

    const data = await api.licenses.create({
      member: MEMBER_ID,
      planUuid: POPULATED_PLAN_UUID,
    });

    const date = new Date();
    const datePlusMonth = new Date(date.setMonth(date.getMonth() + 1)).toISOString().split('T')[0];

    expect(data).toBeTruthy();
    expect(data.capabilities).toEqual(POPULATED_PRODUCT_CAPABILITY);
    expect(data.granteeId).toEqual(MEMBER_ID);
    expect(data.purchaser).toEqual(MEMBER_ID);
    expect(data.productUuid).toEqual(POPULATED_PRODUCT_UUID);
    expect(data.planUuid).toEqual(POPULATED_PLAN_UUID);
    expect(data.status).toEqual('ACTIVE');
    expect(data.paymentService).toEqual('ad-hoc');
    expect(data.endTime.split('T')[0]).toEqual(datePlusMonth);

    // TODO: Add a call to api.licenses.delete() to remove the created license
  });

  // 8. Invalid granteeId
  it('Should throw an error of "Bad Gateway" when an invalid granteeID is passed', async () => {
    const api = new Salable(SALABLE_API_KEY);

    async function handleFetch() {
      return await api.licenses.create({
        member: MEMBER_ID,
        // eslint-disable-next-line
        // @ts-ignore
        granteeId: 12345,
        planUuid: POPULATED_PLAN_UUID,
      });
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Bad Gateway');
  });
});

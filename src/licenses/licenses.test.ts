import fetch from 'jest-fetch-mock';
import Licenses from './index';
import { BaseRequest } from '../base';

const api = new Licenses('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(mockResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
});

describe('Unit | ThirdPartyAPI | Licenses', () => {
  it('Get all licenses: should return the response unchanged with no parameters set', async () => {
    const fetchedLicenses = await api.getAll();
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
  });

  it('Get all licenses: should return the response unchanged with all parameters set', async () => {
    const fetchedLicenses = await api.getAll({
      take: 10,
      subscriptionUuid: 'aaaaa',
      cursor: 'xxxxx',
      status: 'active',
    });
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      'licenses?cursor=xxxxx&subscriptionUuid=aaaaa&status=active&take=10'
    );
  });

  describe('Check capabilities', () => {
    describe('Success cases', () => {
      it('Check capabilities: should apply a grace period and return the response unchanged', async () => {
        const fetchedLicenses = await api.check('xxxxx', ['aaaaa', 'bbbbb'], 10);
        expect(fetchedLicenses).toStrictEqual(mockResponse);
        expect(requestSpyOn).toHaveBeenCalledWith(
          'licenses/check?productUuid=xxxxx&granteeIds=aaaaa,bbbbb&grace=10'
        );
      });
      it('Check capabilities: should return empty response with the response unchanged', async () => {
        fetch.mockResponse('', {
          headers: { 'Content-Type': 'text/plain' },
        });
        const fetchedLicenses = await api.check('xxxxx', ['aaaaa']);
        expect(fetchedLicenses).toStrictEqual('');
        expect(requestSpyOn).toHaveBeenCalledWith(
          'licenses/check?productUuid=xxxxx&granteeIds=aaaaa'
        );
      });
    });
  });

  it('Create License: should call the request with the correct parameters and return response unchanged', async () => {
    const createParams = {
      planUuid: 'xxxxx',
      member: 'orgId_1',
      granteeId: 'userId_1',
    };
    const createLicense = await api.create(createParams);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses', {
      method: 'POST',
      body: createParams,
    });
    expect(createLicense).toStrictEqual(mockResponse);
  });

  it('Create Many Licenses: should call the request with the correct parameters and return response unchanged', async () => {
    const createParams = {
      planUuid: 'xxxxx',
      member: 'orgId_1',
      granteeId: 'userId_1',
    };
    const createLicenses = await api.create([createParams, createParams]);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses', {
      method: 'POST',
      body: [createParams, createParams],
    });
    expect(createLicenses).toStrictEqual(mockResponse);
  });

  it('Get one license: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getOne('xxxxx');
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/xxxxx');
  });

  it('Check capabilities: should return the response unchanged', async () => {
    const fetchedLicenses = await api.check('xxxxx', ['xxxxx']);
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
  });

  it('Get Licenses count: should call the request with the correct parameters', async () => {
    const getCount = await api.getCount('xxxxx', 'ACTIVE');
    expect(requestSpyOn).toHaveBeenCalledWith(
      'licenses/count?subscriptionUuid=xxxxx&status=ACTIVE'
    );
    expect(getCount).toStrictEqual(mockResponse);
  });

  it('Get licenses for purchaser: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getForPurchaser('userId_1', 'xxxxx', {
      status: 'ACTIVE',
      cancelLink: true,
    });
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith(
      'licenses/purchaser?purchaser=userId_1&productUuid=xxxxx&expand=cancelLink&status=ACTIVE'
    );
  });

  it('Get licenses for granteeId: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getForGranteeId('userId_1');
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/granteeId/userId_1');
  });

  it('Get usage on license: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getUsage('xxxxx');
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/xxxxx/usage');
  });

  it('Update License: should call the request with the correct parameters and return response unchanged', async () => {
    const updateLicense = await api.update('xxxxx', 'userId_2');
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/xxxxx', {
      method: 'PUT',
      body: { granteeId: 'userId_2' },
    });
    expect(updateLicense).toStrictEqual(mockResponse);
  });

  it('Update many Licenses: should call the request with the correct parameters and return response unchanged', async () => {
    const updateParams = [
      {
        uuid: 'xxxxx',
        granteeId: 'userId_1',
      },
      {
        uuid: 'xxxxx',
        granteeId: 'userId_2',
      },
    ];
    const updateManyLicenses = await api.updateMany(updateParams);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses', {
      method: 'PUT',
      body: updateParams,
    });
    expect(updateManyLicenses).toStrictEqual(mockResponse);
  });

  it('Cancel one license: should return the response unchanged', async () => {
    fetch.mockResponseOnce('', {
      headers: { 'Content-Type': 'text/plain' },
    });
    const fetchedLicenses = await api.cancel('xxxxx');
    expect(fetchedLicenses).toStrictEqual('');
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/xxxxx', { method: 'DELETE' });
  });

  it('Cancel many licenses: should return the response unchanged', async () => {
    fetch.mockResponseOnce('', {
      headers: { 'Content-Type': 'text/plain' },
    });
    const cancelLicenses = await api.cancelMany(['xxxxx', 'aaaaa']);
    expect(cancelLicenses).toStrictEqual('');
    expect(requestSpyOn).toHaveBeenCalledWith('licenses/cancel', {
      method: 'POST',
      body: { uuids: ['xxxxx', 'aaaaa'] },
    });
  });

  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.getAll();
    }).rejects.toBe('API is down');
  });
});

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
  it('Get all licenses: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getAll();
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
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

  it('Verify License Check: should verify license check signatures', () => {
    const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAES7jvFxC50Fe2hHd3Sn7Q8TvnxuSZ\nV8HvRHGDvFacOiESAqg3uroeNTgoT7lD4BwQ+fFsn7zig5hwncoTsrCPbw==\n-----END PUBLIC KEY-----`;
    const testLicenseCheckData = [
      { capability: 'One', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'Two', expiry: '2024-08-14T13:15:49.310Z' },
      { capability: 'free_plan_name', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Three', expiry: '2024-08-14T13:32:29.313Z' },
      { capability: 'Four', expiry: '2024-08-14T13:32:29.313Z' },
    ];
    const testSignature =
      '3045022100b210aa29519f3146afe7a0d343a6b7ec5e47a1ac0de9686e2ec4cf0081e159c402206ecf98ad4d1d339c59f7ff3b4744d1f377747702c6253f7904ef6589191a2254';
    const testIncorrectSignature = 'bad-signature';

    const falseLicenseCheck = api.verifyLicenseCheck(
      testPublicKeyPem,
      testIncorrectSignature,
      JSON.stringify(testLicenseCheckData)
    );
    const trueLicenseCheck = api.verifyLicenseCheck(
      testPublicKeyPem,
      testSignature,
      JSON.stringify(testLicenseCheckData)
    );

    expect(falseLicenseCheck).toEqual(false);
    expect(trueLicenseCheck).toEqual(true);
  });

  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.getAll();
    }).rejects.toBe('API is down');
  });
});

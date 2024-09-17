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
        const fetchedLicenses = await api.check({
          productUuid: 'xxxxx',
          granteeIds: ['aaaaa', 'bbbbb'],
          grace: 10,
        });
        expect(fetchedLicenses).toStrictEqual(mockResponse);
        expect(requestSpyOn).toHaveBeenCalledWith(
          'licenses/check?productUuid=xxxxx&granteeIds=aaaaa,bbbbb&grace=10'
        );
      });
      it('Check capabilities: should return empty response with the response unchanged', async () => {
        fetch.mockResponse('', {
          headers: { 'Content-Type': 'text/plain' },
        });
        const fetchedLicenses = await api.check({ productUuid: 'xxxxx', granteeIds: ['aaaaa'] });
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
    const fetchedLicenses = await api.check({ productUuid: 'xxxxx', granteeIds: ['xxxxx'] });
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
  });

  it('Get Licenses count: should call the request with the correct parameters', async () => {
    const getCount = await api.getCount({ subscriptionUuid: 'xxxxx', status: 'ACTIVE' });
    expect(requestSpyOn).toHaveBeenCalledWith(
      'licenses/count?subscriptionUuid=xxxxx&status=ACTIVE'
    );
    expect(getCount).toStrictEqual(mockResponse);
  });

  it('Get licenses for purchaser: should return the response unchanged', async () => {
    const fetchedLicenses = await api.getForPurchaser({
      purchaser: 'userId_1',
      productUuid: 'xxxxx',
      options: {
        status: 'ACTIVE',
        cancelLink: true,
      },
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

  it('Update License: should call the request with the correct parameters and return response unchanged', async () => {
    const updateLicense = await api.update('xxxxx', { granteeId: 'userId_2' });
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
    const testPublicKeyPem = `-----BEGIN PUBLIC KEY-----
    MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEV1+PJVMtma9+3xPstLA5Xo9U6kr9JzHv
    Q5d9m0bFI9Xojy2tSHGAgyxM/O+yM7xPcnKBlg0VGly6ZvWNHeSvcA==
    -----END PUBLIC KEY-----`;
    const testLicenseCheckData = [
      { capability: 'One', expiry: '2024-06-28T20:20:00.592Z' },
      { capability: 'Two', expiry: '2024-06-28T20:20:00.594Z' },
      { capability: 'Three', expiry: '2024-06-28T20:20:00.594Z' },
    ];
    const testSignature =
      '304402201a4dcfcab2ee296586668d8b3df7023c412a789deb9db77bbf87cffbdceed2e50220485b9974ac2a0b038888a4cd954a70b96d0bb3ff4102199744b6806159f27452';
    const testIncorrectSignature = 'bad-signature';

    const falseLicenseCheck = api.verifyLicenseCheck({
      publicKeyPem: testPublicKeyPem,
      signature: testIncorrectSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });
    const trueLicenseCheck = api.verifyLicenseCheck({
      publicKeyPem: testPublicKeyPem,
      signature: testSignature,
      payload: JSON.stringify(testLicenseCheckData),
    });

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

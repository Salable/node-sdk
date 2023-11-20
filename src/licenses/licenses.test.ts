import fetch from 'jest-fetch-mock';
import Licenses from './index';
import { BaseRequest } from '../base';

const api = new Licenses('test-key');
const requestSpyOn = jest.spyOn(api as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = {
  mockProperty: 'example',
};

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | ThirdPartyAPI | Licenses', () => {
  it('Get all licenses: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedLicenses = await api.getAll();
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
  });

  it('Check capabilities: should return the response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const fetchedLicenses = await api.check('xxxxx', ['xxxxx']);
    expect(fetchedLicenses).toStrictEqual(mockResponse);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses');
  });

  it('Create License: should call the request with the correct parameters and return response unchanged', async () => {
    const createParams = {
      planUuid: 'xxxxx',
      member: 'orgId_1',
      granteeId: 'userId_1',
    };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const createLicense = await api.create(createParams);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses', {
      method: 'POST',
      body: createParams,
    });
    expect(createLicense).toStrictEqual(mockResponse);
  });

  it('Update License: should call the request with the correct parameters and return response unchanged', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
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
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const updateManyLicenses = await api.updateMany(updateParams);
    expect(requestSpyOn).toHaveBeenCalledWith('licenses', {
      method: 'PUT',
      body: updateParams,
    });
    expect(updateManyLicenses).toStrictEqual(mockResponse);
  });

  it('Get Licenses count: should call the request with the correct parameters', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockResponse));
    const getCount = await api.getCount('xxxxx', 'ACTIVE');
    expect(requestSpyOn).toHaveBeenCalledWith(
      'licenses/count?subscriptionUuid=xxxxx&status=ACTIVE'
    );
    expect(getCount).toStrictEqual(mockResponse);
  });

  it('should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    await expect(async () => {
      await api.getAll();
    }).rejects.toBe('API is down');
  });
});

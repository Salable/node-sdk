import fetch from 'jest-fetch-mock';
import { Salable } from '../index';

const licenses = [
  {
    uuid: '92053549-7d37-460a-af74-7902ccea027a',
    name: null,
    email: 'andrew@test.com',
    status: 'ACTIVE',
    granteeId: 'example-grantee-id-123',
    paymentService: 'stripe',
    purchaser: 'example-member-123',
    type: 'customId',
    productUuid: 'aed5281c-ff35-491e-8bf9-d22996ae555e',
    planUuid: 'ba5ba35f-1d99-49b9-87c6-e1a9b3c895a5',
    capabilities: [],
    metadata: {
      member: 'example-member-123',
      granteeId: 'example-grantee-id-123',
    },
    startTime: '2022-07-21T11:05:31.438Z',
    endTime: '2022-08-21T11:05:28.000Z',
    updatedAt: '2022-07-21T11:05:31.438Z',
  },
];

beforeEach(() => {
  fetch.resetMocks();
});

describe('Unit | ThirdPartyAPI | Licenses', () => {
  it('UNIT: should gets all licenses', async () => {
    fetch.enableMocks();
    fetch.mockResponseOnce(JSON.stringify(licenses));

    const api = new Salable('test-key');

    const fetchedLicenses = await api.licenses.getAll();
    expect(fetchedLicenses[0].email).toBe('andrew@test.com');
    expect(fetchedLicenses).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('UNIT: should return an error when promise rejects', async () => {
    fetch.enableMocks();
    fetch.mockReject(() => Promise.reject('API is down'));

    const api = new Salable('test-key');

    await expect(async () => {
      await api.licenses.getAll();
    }).rejects.toBe('API is down');
  });

  it('INTEGRATION: should get all licenses, no active licenses', async () => {
    const api = new Salable(process.env.SALABLE_API_KEY);

    const data = await api.licenses.getAll();

    expect(data).toEqual([]);
  });
});

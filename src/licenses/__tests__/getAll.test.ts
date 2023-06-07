import fetch from 'jest-fetch-mock';
import { Salable } from '../../index';

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

describe('Licenses | UNIT', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.enableMocks();
  });

  it('Should gets all licenses', async () => {
    fetch.mockResponseOnce(JSON.stringify(licenses));

    const api = new Salable('test-key');

    const fetchedLicenses = await api.licenses.getAll();
    expect(fetchedLicenses[0].email).toBe('andrew@test.com');
    expect(fetchedLicenses).toHaveLength(1);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Should return an error when promise rejects', async () => {
    fetch.mockReject(() => Promise.reject('API is down'));

    const api = new Salable('test-key');

    await expect(async () => {
      await api.licenses.getAll();
    }).rejects.toBe('API is down');
  });
});

describe('Licenses | INTEGRATION', () => {
  it('Should throw a "Not Found" error when count of licenses === 0', async () => {
    const api = new Salable(process.env.SALABLE_API_KEY);

    async function handleFetch() {
      return await api.licenses.getAll();
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Not Found');
  });

  it('Should throw a "Unauthorized" error when invalid API Key is used', async () => {
    const api = new Salable('invalid-api-key');

    async function handleFetch() {
      return await api.licenses.getAll();
    }

    await expect(async () => {
      await handleFetch();
    }).rejects.toThrow('Unauthorized');
  });
});

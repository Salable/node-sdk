import Salable, { TVersion } from '../..';
import { Event, EventTypeEnum } from '../../types';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { v4 as uuidv4 } from 'uuid';
import { EventStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

const eventUuid = uuidv4();

describe('Events Tests for v2, v3', () => {
  const salableVersions = {} as Record<TVersion, Salable<TVersion>>
  const versions: {version: TVersion; scopes: string[]}[] = [
    { version: 'v2', scopes: ['events:read'] },
    { version: 'v3', scopes: ['events:read'] }
  ];
  beforeAll(async () => {
    await generateTestData();
    for (const {version, scopes} of versions) {
      const value = randomUUID()
      await prismaClient.apiKey.create({
        data: {
          name: 'Sample API Key',
          organisation: testUuids.organisationId,
          value,
          scopes: JSON.stringify(scopes),
          status: 'ACTIVE',
        },
      });
      salableVersions[version] = new Salable(value, version);
    }
  });
  it.each(versions)('getOne: Should successfully fetch the specified event', async ({ version }) => {
    const data = await salableVersions[version].events.getOne(eventUuid);
    expect(data).toEqual(eventSchema);
  });
});

const eventSchema: Event = {
  uuid: expect.any(String),
  type: expect.toBeOneOf(Object.values(EventTypeEnum)) as EventTypeEnum,
  organisation: expect.any(String),
  status: expect.toBeOneOf(Object.values(EventStatus)) as EventStatus,
  isTest: expect.any(Boolean),
  retries: expect.any(Number),
  errorMessage: expect.toBeOneOf([expect.any(String), null]),
  errorCode: expect.toBeOneOf([expect.any(String), null]),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

const generateTestData = async () => {
  await prismaClient.event.create({
    data: {
      uuid: eventUuid,
      type: 'Create seats',
      isTest: false,
      status: 'pending',
      organisation: testUuids.organisationId,
    },
  });
};

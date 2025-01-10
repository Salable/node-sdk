import Salable from '../..';
import { Event, EventTypeEnum, Version } from '../../types';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-test-data';
import { v4 as uuidv4 } from 'uuid';
import { EventStatus } from '@prisma/client';

const version = Version.V2;

const eventUuid = uuidv4();

describe('Events V2 Tests', () => {
  const salable = new Salable(testUuids.devApiKeyV2, version);

  beforeAll(async () => {
    await generateTestData();
  });

  it('getOne: Should successfully fetch the specified event', async () => {
    const data = await salable.events.getOne(eventUuid);
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

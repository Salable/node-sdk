import { initSalable, TVersion, Version, VersionedMethodsReturn } from '../..';
import prismaClient from '../../../test-utils/prisma/prisma-client';
import { testUuids } from '../../../test-utils/scripts/create-salable-test-data';
import { randomUUID } from 'crypto';
import { EventSchema } from '../../schemas/v2/schemas-v2';

const eventUuid = randomUUID();

describe('Events Tests for v2, v3', () => {
  const salableVersions = {} as Record<TVersion, VersionedMethodsReturn<TVersion>>
  const versions: {version: TVersion; scopes: string[]}[] = [
    { version: Version.V2, scopes: ['events:read'] },
    { version: Version.V3, scopes: ['events:read'] }
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
      salableVersions[version] = initSalable(value, version);
    }
  });
  it.each(versions)('getOne: Should successfully fetch the specified event', async ({ version }) => {
    const data = await salableVersions[version].events.getOne(eventUuid);
    expect(data).toEqual(EventSchema);
  });
});

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

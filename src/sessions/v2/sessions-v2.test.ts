import Salable from '../..';
import { Session, SessionScope, Version } from '../../types';
import { testUuids } from '../../../test-utils/scripts/create-test-data';

describe('Sessions V2 Tests', () => {
  const apiKey = testUuids.devApiKeyV2;
  const version = Version.V2;

  const salable = new Salable(apiKey, version);

  it('createSession: Should successfully create a new session', async () => {
    const data = await salable.sessions.createSession({
      scope: SessionScope.PricingTable,
      metadata: {
       productUuid: testUuids.productUuid
      }
    });

    expect(data).toEqual(sessionSchema);
  });
});

const sessionSchema: Session = {
  sessionToken: expect.any(String)
};

import { invalidApi } from '@/src/config';
import { GRANTEE_ID, POPULATED_PRODUCT_UUID } from '@/src/constants';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | check | INTEGRATION', () => {
  // 1. Invalid API key
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.check(POPULATED_PRODUCT_UUID, [GRANTEE_ID]);
  });

  // 2. productUuid is not valid && granteeIds is valid
  // 3. productUuid is empty && granteeIds is valid
  // 4. productUuid is valid && granteeIds is empty
  // 5. productUuid is not valid && granteeIds is not empty
  // 6. productUuid is valid && granteeIds is not empty
});

import { invalidApi } from '@/src/config';
import { invalidApiKeyTest } from '@/src/utils/test-helper-functions';

describe('Licenses | delete | INTEGRATION', () => {
  // 1. API Key is not valid
  invalidApiKeyTest(async () => {
    return await invalidApi.licenses.delete('');
  }, 'Forbidden');

  // 2. licenseUuid is valid

  // 3. licenseUuid is invalid

  // 4. licenseUuid is missing
});

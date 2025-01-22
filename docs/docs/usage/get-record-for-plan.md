---
sidebar_position: 3
---

# Get Current Usage Record for Grantee on Plan

Returns the currency usage record for a metered license

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const records = await salable.usage.getCurrentUsageRecord({
  granteeId: 'grantee_1', 
  planUuid: 'a155a63d-4391-4301-b335-8d9d977ebad1'
});
```

## Parameters

#### options (_required_)

_Type:_ `CurrentUsageOptions`

| Option         | Type   | Description                                     | Required |
|----------------|--------|-------------------------------------------------|----------|
| granteeId      | string | The granteeId of the license                    | ✅        |
| planUuid       | string | The UUID of the plan the license belongs to     | ✅        |

## Return Type

For more information about this request see our API documentation on [Usage Record Object](https://docs.salable.app/api/v2#tag/Usage/operation/getCurrentLicenseUsage)

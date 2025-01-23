---
sidebar_position: 2
---

# Update Usage

Increments usage count on a License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.usage.updateLicenseUsage({
  granteeId: 'grantee_1', 
  planUuid: 'bc4e485c-cdd6-4cd2-9d61-7d0f6a6ce53c', 
  increment: 1,
  idempotencyKey: '63f37318-c5a5-4e56-b338-cadccc7162e7'
});
```

## Parameters

#### options (_required_)

_Type:_ `UpdateLicenseUsageOptions`

| Option         | Type   | Description                                     | Required |
|----------------|--------|-------------------------------------------------|----------|
| granteeId      | string | The granteeId of the license                    | ✅        |
| planUuid       | string | The UUID of the plan the license belongs to     | ✅        |
| increment      | string | The value to increment the usage on the license | ✅        |
| idempotencyKey | string | A unique key for idempotent requests            | ✅        |

## Return Type

Returns void

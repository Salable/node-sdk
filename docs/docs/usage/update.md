---
sidebar_position: 2
---

# Update Usage

Increments usage count on a License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.usage.updateLicenseUsage('grantee_1', 'bc4e485c-cdd6-4cd2-9d61-7d0f6a6ce53c', 1, '63f37318-c5a5-4e56-b338-cadccc7162e7');
```

## Parameters

#### granteeId (_required_)

_Type:_ `string`

The granteeId of the license

#### planUuid (_required_)

_Type:_ `string`

The UUID of the plan the license belongs to

#### increment (_required_)

_Type:_ `number`

The value to increment the usage on the license

#### idempotencyKey (_required_)

_Type:_ `string`

A unique key for idempotent requests

## Return Type

Returns void

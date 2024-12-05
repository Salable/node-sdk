---
sidebar_position: 2
---

# Update Usage

Increments usage count on a License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.usage.updateLicenseUsage('grantee_1', 'plan_1', 1, 'idempotency_key_1');
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

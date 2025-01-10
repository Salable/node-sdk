---
sidebar_position: 3
---

# Get Current Usage Record for Grantee on Plan

Returns the currency usage record for a metered license

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const records = await salable.usage.getCurrentUsageRecord('grantee_1', 'a155a63d-4391-4301-b335-8d9d977ebad1');
```

## Parameters

#### granteeId (_required_)

_Type:_ `string`

The granteeId of the license

#### planUuid (_required_)

_Type:_ `string`

The UUID of the plan the license belongs to

## Return Type

For more information about this request see our API documentation on [Usage Record Object](https://docs.salable.app/api/v2#tag/Usage/operation/getCurrentLicenseUsage)

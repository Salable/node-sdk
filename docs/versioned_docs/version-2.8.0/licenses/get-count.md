---
sidebar_position: 6
---

# Get Licenses Count

This method returns aggregate count number of Licenses. Optional filters can be applied through query parameters.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenseCount = await salable.licenses.getCount('{{SUBSCRIPTION_UUID}}');
```

## Parameters

#### subscriptionUuid

_Type:_ `string`

The `uuid` of the subscription to filter the license count

#### status

_Type:_ `string`

The `status` of the license to filter by

## Return Type

```json
{
  "count": 10,
  "assigned": 7,
  "unassigned": 3
}
```

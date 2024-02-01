---
sidebar_position: 7
---

# Get Licenses Count

This method returns aggregate count number of Licenses.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenseCount = await salable.licenses.getCount('{{SUBSCRIPTION_UUID}}');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The `uuid` of the subscription to filter the license count

#### status

_Type:_ `string`

The `status` of the license to filter by

## Return Type

For more information about this request see our API documentation on [License count](https://docs.salable.app/api#tag/Licenses/operation/getLicensesCount)

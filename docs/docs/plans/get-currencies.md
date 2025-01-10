---
sidebar_position: 5
---

# Get Currencies

Returns a list of all the Currencies associated with a Plan

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const plan = await salable.plans.getCurrencies('8494c276-ad2d-4341-bba0-f0fd416b7cec');
```

## Parameters

##### planUuid (_required_)

_Type:_ `string`

The `uuid` of the Plan to return the Currencies from

## Return Type

For more information about this request see our API documentation on [Plan Currency Object](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCurrencies)

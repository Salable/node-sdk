---
sidebar_position: 5
---

# Get Currencies

Returns the currencies of a single plan.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plan = await salable.plans.getCurrencies('41cf33a2-136e-4959-b5c7-73889ab94eff');
```

## Parameters

##### planId (_required_)

_Type:_ `string`

The `uuid` of the Plan to return the Currencies from

## Return Type

For more information about this request see our API documentation on [Plan Currency Object](https://docs.salable.app/api#tag/Plans/operation/getPlanCurrencies)

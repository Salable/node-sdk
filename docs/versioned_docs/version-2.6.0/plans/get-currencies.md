---
sidebar_position: 5
---

# Get Currencies

Returns the currencies of a single plan.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API_KEY}}');

  try {
    const plan = await salable.plans.getCurrencies('41cf33a2-136e-4959-b5c7-73889ab94eff');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### planId (_required_)

_Type:_ `string`

Plan `uuid` of the plan you wish to retrieve

## Return Type

For more information about this request see our API documentation on [Plan Currency Object](https://docs.salable.app/api#tag/Plans/operation/getPlanCurrencies)

---
sidebar_position: 3
---

# Get Features

Returns the features of a single plan.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const plan = await salable.plans.getFeatures('41cf33a2-136e-4959-b5c7-73889ab94eff');
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

For more information about this request see our api documentation on [Plan Feature Object](https://docs.salable.app/api#tag/Plans/operation/getPlanFeatures)
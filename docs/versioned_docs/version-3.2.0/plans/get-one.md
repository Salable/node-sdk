---
sidebar_position: 1
---

# Get One Plan

Returns the details of a single plan.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const plan = await salable.plans.getOne('{{PLAN_UUID}}');
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

For more information about this request see our API documentation on [plan object](https://docs.salable.app/api#tag/Plans/operation/getPlanByUuid)

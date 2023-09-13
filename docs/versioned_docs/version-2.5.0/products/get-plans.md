---
sidebar_position: 4
---

# Get Plans

Returns a list of all the plans associated with a product

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('API-KEY');

  try {
    const plans = await salable.products.getPlans();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of an array of [Plan Object](/api/api-latest/objects/plan-object)

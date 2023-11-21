---
sidebar_position: 7
---

# Get Capabilities

Returns a list of all the capabilities associated with a product

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('API-KEY');

  try {
    const currencies = await salable.products.getCapabilities();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of an array of a [Capability Object](/api/api-latest/objects/capability-object)
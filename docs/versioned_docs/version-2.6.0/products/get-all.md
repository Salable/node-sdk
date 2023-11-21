---
sidebar_position: 2
---

# Get All

Returns a list of all the products created by your Salable organization

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('API-KEY');

  try {
    const products = await salable.products.getAll();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of an array of [Product Object](https://docs.salable.app/api#tag/Products/operation/getProductByUuid)

---
sidebar_position: 3
---

# Get Pricing Table for a Product

Returns all necessary data on a Product to be able to display a pricing table.

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

Promise of [Product Pricing Table](/api/api-latest/products/get-pricing-table-of-product#sample-response)

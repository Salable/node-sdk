---
sidebar_position: 6
---

# Get Currencies

Returns a list of all the currencies associated with a product

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('API-KEY');

  try {
    const currencies = await salable.products.getCurrencies();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of an array of a [Product Currency Object](/api/api-latest/objects/product-currency-object)

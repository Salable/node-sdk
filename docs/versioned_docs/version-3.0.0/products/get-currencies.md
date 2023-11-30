---
sidebar_position: 6
---

# Get Currencies

Returns a list of all the currencies associated with a product

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const currencies = await salable.products.getCurrencies();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

For more information about this request see our API documentation on [Product Currency Object](https://docs.salable.app/api#tag/Products/operation/getProductCurrencies)

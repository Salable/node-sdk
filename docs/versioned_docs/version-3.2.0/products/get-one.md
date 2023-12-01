---
sidebar_position: 1
---

# Get One

Returns the details of a single product.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const product = await salable.products.getOne('{{PRODUCT_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

The `uuid` of the Product to be returned

## Return Type

For more information about this request see our API documentation on [product object](https://docs.salable.app/api#tag/Products/operation/getProductByUuid)

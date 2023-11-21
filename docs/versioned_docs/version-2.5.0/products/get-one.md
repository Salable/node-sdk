---
sidebar_position: 1
---

# Get One

Returns the details of a single product.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const product = await salable.products.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

Product `uuid` of the product you wish to retrieve

## Return Type

Promise of a [product object](https://docs.salable.app/api#tag/Products/operation/getProductByUuid)

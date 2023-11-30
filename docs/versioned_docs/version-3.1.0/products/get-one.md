---
sidebar_position: 1
---

# Get One

Returns the details of a single product.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const product = await salable.products.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');

```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

Product `uuid` of the product you wish to retrieve

## Return Type

For more information about this request see our API documentation on [product object](https://docs.salable.app/api#tag/Products/operation/getProductByUuid)

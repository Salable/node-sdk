---
sidebar_position: 1
---

# Get One

Returns the details of a single product.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const product = await salable.products.getOne('{{PRODUCT_UUID}}');
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

The `uuid` of the Product to be returned

## Return Type

For more information about this request see our API documentation on [product object](https://docs.salable.app/api/v2#tag/Products/operation/getProductByUuid)

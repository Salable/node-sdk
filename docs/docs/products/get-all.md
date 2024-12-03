---
sidebar_position: 2
---

# Get All Products

Returns a list of all the products created by your Salable organization

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const products = await salable.products.getAll();
```

## Return Type

For more information about this request see our API documentation on [Product Object](https://docs.salable.app/api/v2#tag/Products/operation/getProducts)

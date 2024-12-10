---
sidebar_position: 3
---

# Get Pricing Table for a Product

Returns all necessary data on a Product to be able to display a pricing table.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const products = await salable.products.getAll();
```

## Return Type

For more information about this request see our API documentation on [Product Pricing Table](https://docs.salable.app/api/v2#tag/Products/operation/getProductPricingTable)

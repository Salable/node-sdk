---
sidebar_position: 7
---

# Get Capabilities

Returns a list of all the capabilities associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const currencies = await salable.products.getCapabilities('product_1');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product

## Return Type

For more information about this request see our API documentation on [Product Capability Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductCapabilities)

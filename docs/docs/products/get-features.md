---
sidebar_position: 5
---

# Get Features for a product

Returns a list of all the features associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const features = await salable.products.getFeatures('{{productUuid}}');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product

## Return Type

For more information about this request see our API documentation on [Product Feature Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductFeatures)

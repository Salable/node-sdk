---
sidebar_position: 5
---

# Get Features

Returns a list of all the features associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const features = await salable.products.getFeatures();
```

## Return Type

For more information about this request see our API documentation on [Feature Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductFeatures)

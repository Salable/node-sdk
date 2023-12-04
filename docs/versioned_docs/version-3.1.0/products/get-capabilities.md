---
sidebar_position: 7
---

# Get Capabilities

Returns a list of all the capabilities associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const currencies = await salable.products.getCapabilities();
```

## Return Type

For more information about this request see our API documentation on [Capability Object](https://docs.salable.app/api#tag/Products/operation/getProductCapabilities)

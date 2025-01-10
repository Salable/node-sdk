---
sidebar_position: 7
---

# Get Capabilities

Returns a list of all the capabilities associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const currencies = await salable.products.getCapabilities('cc5fcd03-cfd1-471e-819d-2193746f93dd');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product

## Return Type

For more information about this request see our API documentation on [Product Capability Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductCapabilities)

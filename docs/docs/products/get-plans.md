---
sidebar_position: 4
---

# Get Plans for a Product

Returns a list of all the plans associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plans = await salable.products.getPlans('054788af-6f2c-4e7a-bc32-3747b6b0d2e6');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product

## Return Type

For more information about this request see our API documentation on [Plan Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductPlans)

---
sidebar_position: 4
---

# Get Plans

Returns a list of all the plans associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plans = await salable.products.getPlans();
```

## Return Type

For more information about this request see our API documentation on [Plan Object](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanByUuid)

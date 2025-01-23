---
sidebar_position: 6
---

# Get Currencies

Returns a list of all the currencies associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const currencies = await salable.products.getCurrencies();
```

## Return Type

For more information about this request see our API documentation on [Product Currency Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductCurrencies)

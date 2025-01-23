---
sidebar_position: 6
---

# Get Currencies for a product

Returns a list of all the currencies associated with a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const currencies = await salable.products.getCurrencies('1df1f535-4b5c-4948-ac71-71c5e4d3f919');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product

## Return Type

For more information about this request see our API documentation on [Product Currency Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductCurrencies)

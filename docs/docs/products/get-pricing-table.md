---
sidebar_position: 3
---

# Get Pricing Table for a Product

Returns all necessary data on a Product to be able to display a pricing table. Every active plan on the product will be added to the table in the sort order of free plans, paid plans price, and then coming soon plans.

## Code Sample

#### Required parameters

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.products.getPricingTable('7827727d-6fa9-46e6-b865-172ccda6f5a4', {
  granteeId: 'granteeid@email.com',
});
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

The UUID of the Product to build the pricing table for

---

##### queryParams (_required_)

_Type:_ `PricingTableParameters`

Below is the list of properties than can be used in the `queryParams` argument.

| Parameter | Description                                                                                                       | Required |
| --------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| granteeId | The unique identifier for the grantee                                                                             | ✅       |
| currency  | Uses the currency short name e.g USD, defaults to the default currency on the product which the plan is linked to | ❌       |

## Return Type

For more information about this request see our API documentation on [Product Pricing Table Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductPricingTable)

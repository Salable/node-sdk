---
sidebar_position: 3
---

# Get One Pricing Table

Returns all necessary data on a display a pricing table.

## Code Sample

#### Required parameters

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const pricingTable = await salable.pricingTables.getOne('pricing_table_1', {
  granteeId: 'grantee_1',
  currency: 'USD'
});
```
## Parameters

##### pricingTableUuid (_required_)

_Type:_ `string`

The `uuid` of the Pricing Table to build

---

#### options

_Type:_ `{ granteeId: String, currency: String  }`

| Option    | Type   | Description                                                                                                        | Required |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------ | -------- |
| granteeId | string | The unique identifier for the grantee                                                                              | ❌        |
| currency  | string | Uses the currency short name e.g. USD, defaults to the default currency on the Product which the Plan is linked to | ❌        |


## Return Type

For more information about this request see our API documentation on [Pricing Table](https://docs.salable.app/api/v2#tag/Pricing-Tables/operation/getPricingTableByUuid)

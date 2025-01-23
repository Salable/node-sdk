---
sidebar_position: 1
---

# Get One

Returns the details of a single product.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const product = await salable.products.getOne('3fe29048-28bf-461c-8498-c42c3572359c');
```

## Parameters

#### productUuid (_required_)

_Type:_ `string`

The UUID of the Product to be returned

---

#### options

_Type:_ `GetProductOptions`

| Option | Type     | Description                                                                  | Required |
| ------ | -------- | ---------------------------------------------------------------------------- | -------- |
| expand | string[] | Specify which properties to expand. e.g. `{ expand: ['features', 'plans'] }` | ❌       |

## Return Type

For more information about this request see our API documentation on [Product Object](https://docs.salable.app/api/v2#tag/Products/operation/getProductByUuid)

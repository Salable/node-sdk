---
sidebar_position: 5
---

# Get Licenses for a Purchaser

Returns licenses for a purchaser on a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenses = await salable.licenses.getForPurchaser('orgId_1', '{{PRODUCT_UUID}}');
```

## Parameters

#### purchaser (_required_)

_Type:_ `string`

The purchaser of the license

#### productUuid (_required_)

_Type:_ `string`

The `uuid` of the product which the license gives access to

#### options

_Type:_ `LicenseGetByPurchaserOptions`

| Option | Description              |
| ------ | ------------------------ |
| status | Filter by license status |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

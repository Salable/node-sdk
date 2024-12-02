---
sidebar_position: 6
---

# Get Licenses for a Purchaser

Returns licenses for a purchaser on a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const licenses = await salable.licenses.getForPurchaser({purchaser: 'purchaser1', productUuid: '1234', status: 'ACTIVE'});
```

## Parameters

#### purchaserData

_Type:_ `GetPurchasersLicensesOptions`

| Option            | Type   | Description                                |
| ----------------- | ------ | ------------------------------------------ |
| purchaser         | string | The purchaser of the licenses to fetch for |
| productUuid       | string | The UUID of the product                    |
| status (optional) | string | Filter by license status                   |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

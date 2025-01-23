---
sidebar_position: 6
---

# Get Licenses for a Purchaser

Returns licenses for a purchaser on a product

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const licenses = await salable.licenses.getForPurchaser({purchaser: 'purchaser_1', productUuid: 'e7682a81-dd25-4e09-9f64-eebd00194b38', status: 'ACTIVE'});
```

## Parameters

#### getForPurchaserOptions (_required_)

_Type:_ `GetPurchasersLicensesOptions`

| Option      | Type   | Description                                | Required |
| ----------- | ------ | ------------------------------------------ | -------- |
| purchaser   | string | The purchaser of the licenses to fetch for | ✅        |
| productUuid | string | The UUID of the product                    | ✅        |
| status      | string | Filter by license status                   | ❌        |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

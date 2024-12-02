---
sidebar_position: 10
---

# Check License

Retrieves the capabilities the grantee(s) have access to.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const check = await salable.licenses.check({
    productUuid: 'product1',
    granteeIds: ['grantee_1', 'grantee_2'],
});
```

## Parameters

#### checkLicenseData (_required_)

_Type:_ `CheckLicenseInput`

| Option               | Type     | Description                        |
| -------------------- | -------- | ---------------------------------- |
| grantproductUuideeId | string   | The UUID of the product            |
| granteeIds           | string[] | An array of grantee IDs            |
| grace (optional)     | number   | Optional grace period to filter by |

## Return Type

For more information about this request see our API documentation on [License Check Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseCheck)

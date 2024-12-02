---
sidebar_position: 3
---

# Get All Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const licenses = await salable.licenses.getAll();
```

## Parameters

#### options

_Type:_ `GetLicenseOptions`

| Option                      | Type   | Description                                                 |
| --------------------------- | ------ | ----------------------------------------------------------- |
| status (optional)           | string | The status of the created license, e.g. "ACTIVE" "TRIALING" |
| cursor (optional)           | string | Cursor value, used for pagination                           |
| take (optional)             | string | The amount of licenses to fetch                             |
| subscriptionUuid (optional) | string | The UUID of the subscription to filter by                   |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

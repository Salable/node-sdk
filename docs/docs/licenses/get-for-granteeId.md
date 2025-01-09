---
sidebar_position: 7
---

# Get Licenses for a Grantee ID

Returns licenses for a grantee ID

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const licenses = await salable.licenses.getForGranteeId('da88805a-2802-4062-87d7-2b83ddf8e0ca', { expand: 'plan' });
```

## Parameters

#### granteeId (_required_)

_Type:_ `string`

The grantee ID of the licenses

---

#### options

_Type:_ `{ expand: string[] }`

| Option | Type   | Description                                                     | Required |
| ------ | ------ | --------------------------------------------------------------- | -------- |
| expand | string | Specify which properties to expand. e.g. `{ expand: ['plan'] }` | ❌        |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

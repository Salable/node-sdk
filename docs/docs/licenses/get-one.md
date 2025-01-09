---
sidebar_position: 4
---

# Get One License

Returns a single license

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const license = await salable.licenses.getOne('dba43177-43a7-4639-9dba-7b0ff9fcee0a', { expand: 'plan' });
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

The UUID of the license

---

#### options

_Type:_ `{ expand: string[] }`

| Option | Type     | Description                                                    | Required |
| ------ | -------- | -------------------------------------------------------------- | -------- |
| expand | string[] | Specify which properties to expand. e.g. `{ expand: ['plan' }` | ❌        |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

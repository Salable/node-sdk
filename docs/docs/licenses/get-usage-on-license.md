---
sidebar_position: 6
---

# Get usage on a License

Returns usage count on a License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenses = await salable.licenses.getUsage('{{LICENSE_UUID}}');
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the license

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

---
sidebar_position: 4
---

# Get Licenses for a Grantee ID

Returns licenses for a grantee ID

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenses = await salable.licenses.getForGranteeId('userId_1');
```

## Parameters

#### granteeId (_required_)

_Type:_ `string`

The grantee ID of the licenses

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

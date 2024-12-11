---
sidebar_position: 2
---

# Get One License

Returns a single license

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const license = await salable.licenses.getOne('{{LICENSE_UUID}}');
```

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

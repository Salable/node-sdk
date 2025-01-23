---
sidebar_position: 3
---

# Get All Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const licenses = await salable.licenses.getAll();
```

## Return Type

For more information about this request see our API documentation on [Liccense Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

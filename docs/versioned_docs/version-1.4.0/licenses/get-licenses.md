---
sidebar_position: 3
---

# Get Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
import { SalableApi } from '@Salable/node-sdk';

const api = new SalableApi('API-KEY');

const licenses = await api.licenses.getLicenses();
```

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

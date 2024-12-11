---
sidebar_position: 3
---

# Get Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
const { SalableApi } = require('@Salable/node-sdk');

const salable = new SalableApi('API-KEY');

const licenses = await salable.licenses.getLicenses();
```

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

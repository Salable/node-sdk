---
sidebar_position: 3
---

# Get Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
const { SalableApi } = require('@salable/node-sdk');
(async () => {
  const api = new SalableApi('API-KEY');
  try {
    const licenses = await api.licenses.getLicenses();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

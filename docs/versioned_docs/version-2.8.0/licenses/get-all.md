---
sidebar_position: 3
---

# Get All Licenses

Returns a list of all the licenses created by your Salable organization

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('API-KEY');

  try {
    const licenses = await salable.licenses.getAll();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

For more information about this request see our api documentation on [Liccense Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

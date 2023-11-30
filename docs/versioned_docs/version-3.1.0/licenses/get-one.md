---
sidebar_position: 2
---

# Get One License

Returns a single license

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const license = await salable.licenses.getOne('{{LICENSE_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

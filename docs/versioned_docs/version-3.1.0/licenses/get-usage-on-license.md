---
sidebar_position: 6
---

# Get usage on a License

Returns usage count on a License

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const licenses = await salable.licenses.getUsage('{{LICENSE_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the license

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

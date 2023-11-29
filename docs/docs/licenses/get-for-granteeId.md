---
sidebar_position: 3
---

# Get Licenses for a Grantee ID

Returns licenses for a grantee ID

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const licenses = await salable.licenses.getForGranteeId('userId_1');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

#### granteeId (_required_)

_Type:_ `string`

The grantee ID of the licenses

## Return Type

For more information about this request see our api documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)
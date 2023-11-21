---
sidebar_position: 5
---

# Update Many Licenses

This method updates many Licenses with the values passed into the body of the request.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const newLicenses = await salable.licenses.updateMany([
      { granteeId: 'grantee-1', uuid: 'license-id' },
      { granteeId: 'grantee-2', uuid: 'another-license-id' },
    ]);
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### updateManyConfig (_required_)

_Type:_ `IUpdateManyLicenseInput[]`

All config options which can be passed in to this method

#### uuid (_required_)

_Type:_ `string`

The `uuid` of the license to be updated

#### granteeId (_required_)

_Type:_ `string`

The value of the new granteeId

## Return Type

Promise array of all the updated [licenses object](/api/api-latest/objects/license-object)

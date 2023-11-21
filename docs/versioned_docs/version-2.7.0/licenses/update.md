---
sidebar_position: 4
---

# Update License

This method updates specific Licenses with the values passed into the body of the request.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const updatedLicense = await api.licenses.update('license-uuid', 'new-grantee-id');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the license to be updated

---

##### granteeId (_required_)

_Type:_ `string`

The value of the new granteeId

## Return Type

Promise of the updated [license object](/api/api-latest/objects/license-object)

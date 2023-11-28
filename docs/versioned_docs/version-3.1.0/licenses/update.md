---
sidebar_position: 4
---

# Update License

This method updates specific Licenses with the values passed into the body of the request.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const updatedLicense = await api.licenses.update('{{LICENSE_UUID}}', 'userId_2');
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

_Type:_ `string` or `null`

The value of the new granteeId. To un-assign the license set the `granteeId` to `null`.

## Return Type

For more information about this request see our api documentation on [license object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

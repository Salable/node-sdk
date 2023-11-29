---
sidebar_position: 1
---

# Cancel many Licenses

This method will cancel many adhoc Licenses

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const license = await salable.licenses.cancelMany(['{{LICENSE_UUID}}', '{{LICENSE_UUID}}']);
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### licenseUuids (_required_)

_Type:_ `string[]`

Uuids of the Licenses to be canceled

## Return Type

For more information about this request see our api documentation on [cancel many Licenses](https://docs.salable.app/api#tag/Licenses/operation/cancelLicenses)

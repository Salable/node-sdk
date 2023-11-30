---
sidebar_position: 10
---

# Cancel License

This method will cancel an ad hoc License

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    await salable.licenses.cancel('{{LICENSE_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### licenseUuid (_required_)

_Type:_ `string`

`uuid` of the License to be canceled

## Return Type

For more information about this request see our api documentation on [cancel License](https://docs.salable.app/api#tag/Licenses/operation/cancelLicense)

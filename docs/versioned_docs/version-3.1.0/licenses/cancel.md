---
sidebar_position: 10
---

# Cancel License

This method will cancel an ad hoc License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.licenses.cancel('{{LICENSE_UUID}}');
```

## Parameters

##### licenseUuid (_required_)

_Type:_ `string`

`uuid` of the License to be canceled

## Return Type

For more information about this request see our API documentation on [cancel License](https://docs.salable.app/api/v2#tag/Licenses/operation/cancelLicense)

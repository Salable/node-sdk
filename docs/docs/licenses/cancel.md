---
sidebar_position: 11
---

# Cancel License

This method will cancel an ad hoc License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.licenses.cancel('license_1');
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

`uuid` of the License to be canceled

## Return Type

For more information about this request see our API documentation on [cancel License](https://docs.salable.app/api/v2#tag/Licenses/operation/cancelLicense)

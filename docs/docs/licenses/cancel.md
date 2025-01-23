---
sidebar_position: 11
---

# Cancel License

This method will cancel an ad hoc License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.licenses.cancel('8ea5c243-7052-4906-acc5-a84690e2cad9');
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

`uuid` of the License to be canceled

## Return Type

For more information about this request see our API documentation on [cancel License](https://docs.salable.app/api/v2#tag/Licenses/operation/cancelLicense)

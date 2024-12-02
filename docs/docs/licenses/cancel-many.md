---
sidebar_position: 12
---

# Cancel many Licenses

This method will cancel many ad hoc Licenses

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.licenses.cancelMany(['license1', 'license2']);
```

## Parameters

##### licenseUuids (_required_)

_Type:_ `string[]`

`uuid` array of the Licenses to be canceled

## Return Type

For more information about this request see our API documentation on [cancel many Licenses](https://docs.salable.app/api#tag/Licenses/operation/cancelLicenses)

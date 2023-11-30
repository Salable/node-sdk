---
sidebar_position: 11
---

# Cancel many Licenses

This method will cancel many ad hoc Licenses

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.licenses.cancelMany(['{{LICENSE_UUID_ONE}}', '{{LICENSE_UUID_TWO}}']);
```

## Parameters

##### licenseUuids (_required_)

_Type:_ `string[]`

`uuid` array of the Licenses to be canceled

## Return Type

For more information about this request see our API documentation on [cancel many Licenses](https://docs.salable.app/api#tag/Licenses/operation/cancelLicenses)

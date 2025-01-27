---
sidebar_position: 12
---

# Cancel many Licenses

This method will cancel many ad hoc Licenses

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.licenses.cancelMany({uuids: ['c6b04b5b-3a5f-405d-af32-791912adfb53', 'ac4ff75d-714a-4eb3-8d3b-a34fe081c36a']});
```

## Parameters

##### licenseUuids (_required_)

_Type:_ `string[]`

`uuid` array of the Licenses to be canceled

## Return Type

For more information about this request see our API documentation on [cancel many Licenses](https://docs.salable.app/api/v2#tag/Licenses/operation/cancelLicenses)

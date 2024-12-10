---
sidebar_position: 2
---

# Check License

This method returns the capabilities assigned to a group of granteeIds.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.licenses.cancelMany(['{{LICENSE_UUID_ONE}}', '{{LICENSE_UUID_TWO}}']);
```

```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

Product `uuid` of the capabilities you wish to check

---

##### granteeIds (_required_)

_Type:_ `string[]`

A String array of the grantee Ids you wish to check against

## Return Type

For more information about this request see our API documentation on [License Check Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseCheck)
```

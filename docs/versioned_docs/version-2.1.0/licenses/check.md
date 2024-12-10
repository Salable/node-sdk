---
sidebar_position: 2
---

# Check License

This method returns the capabilities assigned to a group of granteeIds.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const check = await salable.licenses.check('{{PRODUCT_UUID}}', ['userId_1', 'userId_2']);
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

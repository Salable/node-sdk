---
sidebar_position: 1
---

# Check Entitlements

Retrieves the features the grantee(s) have access to.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const check = await salable.entitlements.check({
  productUuid: '{{PRODUCT_UUID}}', 
  granteeIds: ['userId_1', 'userId_2']
});
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

Product `uuid`

---

##### granteeIds (_required_)

_Type:_ `string[]`

A String array of the grantee Ids you wish to check against

## Return Type

For more information about this request see our API documentation on [Entitlements Check](https://docs.salable.app/api/v3#tag/Entitlements/operation/getEntitlementsCheck)

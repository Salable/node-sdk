---
sidebar_position: 9
---

# Update Many Licenses

This method updates many Licenses with the values passed into the body of the request.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const updatedLicenses = await salable.licenses.updateMany([
  { granteeId: 'userId_1', uuid: '4886d8c4-fbb0-4a68-bf28-2a640269b0f9' },
  { granteeId: 'userId_2', uuid: '65157cf5-cad6-4528-ac13-e5e26733f730' },
]);
```

## Parameters

### updateManyLicensesParams(_required_)

_Type:_ `UpdateManyLicenseInput[]`

| Option    | Type   | Description                       | Required |
| --------- | ------ | --------------------------------- | -------- |
| granteeId | string | The new grantee ID value          | ✅        |
| uuid      | string | The UUID of the license to update | ✅        |


## Return Type

For more information about this request see our API documentation on [licenses object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

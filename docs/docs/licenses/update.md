---
sidebar_position: 8
---

# Update License

This method updates specific Licenses with the values passed into the body of the request.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const updatedLicense = await salable.licenses.update('license_1', { granteeId: 'updated_grantee_id' });
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the license to be updated

---

#### updateLicenseParams (_required_)

_Type:_ `{ granteeId: string }`

| Option    | Type   | Description              | Required |
| --------- | ------ | ------------------------ | -------- |
| granteeId | string | The new grantee ID value | ✅        |

## Return Type

For more information about this request see our API documentation on [license object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

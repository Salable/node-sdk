---
sidebar_position: 8
---

# Update License

This method updates specific Licenses with the values passed into the body of the request.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const updatedLicense = await salable.licenses.update('e38f0e83-b82d-4f95-a374-6663061456c3', { granteeId: 'updated_grantee_id' });
```

## Parameters

#### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the license to be updated

---

#### updateLicenseParams (_required_)

_Type:_ `{ granteeId: string }`

| Option    | Type           | Description                                                                        | Required |
| --------- | -------------- | ---------------------------------------------------------------------------------- | -------- |
| granteeId | string or null | The new grantee ID for the license                                                 | ✅       |
| endTime   | string         | Custom DateTime string for the license which overrides the plan's default interval | ❌       |

## Return Type

For more information about this request see our API documentation on [license object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

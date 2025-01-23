---
sidebar_position: 2
---

# Create Many Licenses

This method creates many ad hoc licenses

## Code Sample

### Create Many

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const license = await salable.licenses.createMany([
  {
    planUuid: 'fabdea7e-2a9a-4ed8-b3f6-20c029dcbacc',
    member: 'orgId_1234',
    granteeId: 'userId_1',
    status: 'ACTIVE',
    endTime: '2025-07-06T12:00:00.000Z',
  },
  {
    planUuid: '2e2170a9-3750-4176-aaf3-ff1ef12e8f66',
    member: 'orgId_1234',
    granteeId: 'userId_2',
    status: 'ACTIVE',
    endTime: '2025-07-06T12:00:00.000Z',
  }
]);
```

## Parameters

#### createManyAdHocLicenseParams (_required_)

_Type:_ `CreateAdhocLicenseInput[]`

| Option    | Type   | Description                                                                                                           | Required |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------- | -------- |
| planUuid  | string | The UUID of the plan associated with the license. The planUuid can be found on the Plan view in the Salable dashboard | ✅        |
| member    | string | The ID of the member who will manage the license.                                                                     | ✅        |
| granteeId | string | The grantee ID for the license.                                                                                       | ❌        |
| status    | string | The status of the created license, e.g. "ACTIVE" "TRIALING"                                                           | ❌        |
| endTime   | string | Provide a custom end time for the license; this will override the plan's default interval.                            | ❌        |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseByUuid)

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
    planUuid: '{{PLAN_UUID}}',
    member: 'orgId_1234',
    granteeId: 'userId-1',
    status: 'ACTIVE',
    endTime: '2025-07-06T12:00:00.000Z',
  },
  {
    planUuid: '{{PLAN2_UUID}}',
    member: 'orgId_1234',
    granteeId: 'userId-2',
    status: 'ACTIVE',
    endTime: '2025-07-06T12:00:00.000Z',
  }
]);
```

## Parameters

#### options

_Type:_ `CreateAdhocLicenseInput[]`

| Option               | Type   | Description                                                                                                           |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| planUuid             | string | The UUID of the plan associated with the license. The planUuid can be found on the Plan view in the Salable dashboard |
| member               | string | The ID of the member who will manage the license.                                                                     |
| granteeId (optional) | string | The grantee ID for the license.                                                                                       |
| status (optional)    | string | The status of the created license, e.g. "ACTIVE" "TRIALING"                                                           |
| endTime (optional)   | string | Provide a custom end time for the license; this will override the plan's default interval.                            |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

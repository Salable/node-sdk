---
sidebar_position: 1
---

# Get All Usage Records for a Grantee

Returns a list of all the usage records for grantee's metered licenses

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const records = await salable.usage.getAllUsageRecords({
  granteeId: 'grantee_1'
});
```

## Parameters

#### options (_required_)

_Type:_ `GetLicenseOptions`

| Option           | Type   | Description                                                                          | Required |
|------------------|--------|--------------------------------------------------------------------------------------|----------|
| granteeId        | string | The granteeId of the license                                                  | ✅        |
| type             | string | Filter by the type of usage record                                                   | ❌        |
| status           | string | Filter by the status of the license                                                  | ❌        |
| planUuid         | string | The UUID of the plan the license belongs to                                          | ❌        |
| subscriptionUuid | string | Filters usage records by their license's subscription                                | ❌        |
| sort             | string | Sorts usage records by createdAt field. Default (`'asc'`). Enum: `'asc'` \| `'desc'` | ❌        |
| cursor           | string | Cursor value, used for pagination                                                    | ❌        |
| take             | string | The amount of licenses to fetch                                                      | ❌        |

## Return Type

For more information about this request see our API documentation on [Usage Record Object](https://docs.salable.app/api/v2#tag/Usage/operation/getLicenseUsage)

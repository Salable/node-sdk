---
sidebar_position: 1
---

# Get All Plans

Returns a list of plans with cursor based pagination.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

const plans = await salable.plans.getAll();
```

## Parameters

#### options (_required_)

_Type:_ `GetAllPlansOptionsV3`

| **Parameter** | **Type**        | **Description**                                             | **Required** |
|:--------------|:----------------|:------------------------------------------------------------|:------------:|
| cursor        | string          | Cursor value, used for pagination                           |      ❌       |
| take          | number          | The number of subscriptions to fetch. Default: `20`         |      ❌       |
| sort          | `asc` \| `desc` | Default `asc` - sorted by `slug`                            |      ❌       |
| archived      | boolean         | Default response returns both archived and unarchived plans |      ❌       |
| productUuid   | string          | Filter plans by product                                     |      ❌       |

## Return Type

For more information about this request see our API documentation on [get all plans](https://docs.salable.app/api/v3#tag/Plans/operation/getPlans).

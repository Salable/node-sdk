---
sidebar_position: 1
---

# Get One Plan

Returns the details of a single plan.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plan = await salable.plans.getOne('{{PLAN_UUID}}');
```

## Parameters

##### planId (_required_)

_Type:_ `string`

The `uuid` of the Plan to be returned

## Return Type

For more information about this request see our API documentation on [plan object](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanByUuid)

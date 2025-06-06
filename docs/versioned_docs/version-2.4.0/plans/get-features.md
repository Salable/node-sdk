---
sidebar_position: 3
---

# Get Features

Returns a list of all the Features associated with a Plan

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plan = await salable.plans.getFeatures('{{PLAN_UUID}}');
```

## Parameters

##### planId (_required_)

_Type:_ `string`

The `uuid` of the Plan to return the Features from

## Return Type

For more information about this request see our API documentation on [Plan Feature Object](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanFeatures)

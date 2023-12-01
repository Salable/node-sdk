---
sidebar_position: 4
---

# Get Capabilities

Returns a list of all the capabilities associated with a Plan

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const plan = await salable.plans.getCapabilities('{{PLAN_UUID}}');
```

## Parameters

##### planId (_required_)

_Type:_ `string`

The `uuid` of the Plan to return the Features from

## Return Type

For more information about this request see our API documentation on [Plan Capability Object](https://docs.salable.app/api#tag/Plans/operation/getPlanCapabilities)

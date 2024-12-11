---
sidebar_position: 4
---

# Get Capabilities

Returns a list of all the Capabilities associated with a Plan

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const plan = await salable.plans.getCapabilities('plan_1');
```

## Parameters

##### planUuid (_required_)

_Type:_ `string`

The `uuid` of the Plan to return the Features from

## Return Type

For more information about this request see our API documentation on [Plan Capability Object](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCapabilities)

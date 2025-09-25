---
sidebar_position: 2
---

# Get One Plan

Returns the details of a single plan.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

const plan = await salable.plans.getOne('f965551b-5070-48df-b3aa-944c7ff876e0', { expand: ['product', 'features', 'currencies'] });
```

## Parameters

#### planUuid (_required_)

_Type:_ `string`

The `uuid` of the Plan to be returned

---

#### options

_Type:_ `{ expand: string[] }`

| Option | Type   | Description                                                        | Required |
| ------ | ------ | ------------------------------------------------------------------ | -------- |
| expand | string | Specify which properties to expand. e.g. `{ expand: ['product'] }` | ❌        |


## Return Type

For more information about this request see our API documentation on [plan object](https://docs.salable.app/api/v3#tag/Plans/operation/getPlanByUuid)

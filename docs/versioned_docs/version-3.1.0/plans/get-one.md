---
sidebar_position: 1
---

# Get One Plan

Returns the details of a single plan.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const plan = await salable.plans.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');

```

## Parameters

##### planId (_required_)

_Type:_ `string`

Plan `uuid` of the plan you wish to retrieve

## Return Type

For more information about this request see our API documentation on [plan object](https://docs.salable.app/api#tag/Plans/operation/getPlanByUuid)

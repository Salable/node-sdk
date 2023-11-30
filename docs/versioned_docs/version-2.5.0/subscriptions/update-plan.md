---
sidebar_position: 2
---

# Update a Subscription's Plan

Update the subscription to a new plan.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const subscription = await salable.subscriptions.updatePlan(
  '{{PLAN_UUID}}',
  '{{SUBSCRIPTION_UUID}}'
);
```

## Parameters

##### newPlanId (_required_)

_Type:_ `string`

The `uuid` of the new Plan the Subscription will be moved to

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription that is being moved

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api#tag/Subscriptions/operation/getSubscriptionByUuid)

---
sidebar_position: 3
---

# Update a Subscription's Plan (DEPRECATED)

This method is deprecated. Please use the [Change Plan](./change-plan.md) method.

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

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionByUuid)

---
sidebar_position: 2
---

# Update a Subscription's Plan (DEPRECATED)

This method is deprecated. Please use the [Change Plan](./change-plan.md) method.

Update the subscription to a new plan.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const subscription = await salable.subscriptions.updatePlan(
      '41cf33a2-136e-4959-b5c7-73889ab94eff',
      '2dc7b9ab-e3bc-4151-9443-07ddffd7350d'
    );
  } catch (err) {
    console.error(err);
  }
})();
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

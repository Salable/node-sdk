---
sidebar_position: 2
---

# Change Plan

Update the subscription to a new plan.

## Code Sample

```typescript
const { SalableApi } = require('@salable/node-sdk');

const api = new SalableApi('API-KEY');

const subscription = await api.subscriptions.changePlan(
  '41cf33a2-136e-4959-b5c7-73889ab94eff',
  '2dc7b9ab-e3bc-4151-9443-07ddffd7350d'
);
```

## Parameters

##### newPlanId (_required_)

_Type:_ `string`

The `uuid` of the new Plan the Subscription will be moved to

##### subscriptionId (_required_)

_Type:_ `string`
The `uuid` of the subscription you wish to update

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api#tag/Subscriptions/operation/getSubscriptionByUuid)

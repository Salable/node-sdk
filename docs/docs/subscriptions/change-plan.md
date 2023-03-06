---
sidebar_position: 2
---

# Change Plan

Update the subscription to a new plan.

## Code Sample

```typescript
const { SalableApi } = require("@Salable/node-sdk");
(async () => {
  const api = new SalableApi("API-KEY");
  try {
    const subscription = await api.subscriptions.changePlan(
      "41cf33a2-136e-4959-b5c7-73889ab94eff",
      "2dc7b9ab-e3bc-4151-9443-07ddffd7350d"
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### newPlanId (_required_)

_Type:_ `string`

Plan `uuid` of the new plan you wish to update to

##### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid` of the subscription you wish to update

## Return Type

Promise of a subscription object

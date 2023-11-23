---
sidebar_position: 2
---

# Change A Subscription's Plan

Change a subscription to a new plan. Proration behaviour can optionally be set.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const changeSubscriptionPlan = await salable.subscriptions.changePlan('subscription-uuid', {
      planUuid: 'plan-uuid',
    });
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### subscriptionUuid (_required_)

_Type:_ `string`

Subscription `uuid`

### config (_required_)

_Type:_ `SubscriptionsChangePlanBody`

| **Parameter** |                  **Description**                   |                                                                                                     **Notes**                                                                                                      | **Required** |
| :-----------: | :------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------: |
|   planUuid    | The uuid of the Plan the Subscription is moving to |                                                                                                                                                                                                                    |      ✅      |
|   proration   |                Proration behaviour                 | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. |      ❌      |

## Return Type

Promise of a subscription object

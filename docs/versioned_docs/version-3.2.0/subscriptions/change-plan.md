---
sidebar_position: 2
---

# Change a Subscription's Plan

Move a Subscription to a new Plan. Proration behaviour can optionally be set.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const changeSubscriptionPlan = await salable.subscriptions.changePlan('{{SUBSCRIPTION_UUID}}', {
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

The `uuid` of the Subscription that is being moved

##### config (_required_)

_Type:_ `SubscriptionsChangePlanBody`

| **Parameter** |                   **Description**                    |                                                                                                     **Notes**                                                                                                      | **Required** |
| :-----------: | :--------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------: |
|   planUuid    | The `uuid` of the Plan the Subscription is moving to |                                                                                                                                                                                                                    |      ✅      |
|   proration   |                 Proration behaviour                  | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. |      ❌      |

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api#tag/Subscriptions/operation/getSubscriptionByUuid)

---
sidebar_position: 3
---

# Change a Subscription's Plan

Move a Subscription to a new Plan. Proration behaviour can optionally be set.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const changeSubscriptionPlan = await salable.subscriptions.changePlan('{{subscriptionUuid}}', {
  planUuid: '{{planUuid}}',
});
```

## Parameters

##### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription that is being moved

##### options (_required_)

_Type:_ `SubscriptionsChangePlanOptions`


| Option                      | Type                                                         | Description                                                | Required    |
| --------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| planUuid                    | The `uuid` of the Plan the Subscription is moving to         | The status of the subscription, e.g. "ACTIVE" "CANCELED"                    |  ✅         |
| proration                   | Proration behaviour                                          | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations.      | ❌          |

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/changeSubscriptionsPlan)

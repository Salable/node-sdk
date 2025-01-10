---
sidebar_position: 3
---

# Change a Subscription's Plan

Move a Subscription to a new Plan. Proration behaviour can optionally be set.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const changeSubscriptionPlan = await salable.subscriptions.changePlan('e9e8c539-f2ef-451d-a072-bde07d066a03', {
  planUuid: 'ce361df2-4555-4259-9349-84e046225d3d',
});
```

## Parameters

##### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription that is being moved

##### options (_required_)

_Type:_ `SubscriptionsChangePlanOptions`

| Option    | Type   | Description                                                                                                                                                                                                        | Required |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| planUuid  | string | The status of the subscription, e.g. "ACTIVE" "CANCELED"                                                                                                                                                           | ✅       |
| proration | string | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/changeSubscriptionsPlan)

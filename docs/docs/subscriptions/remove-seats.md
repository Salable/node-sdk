---
sidebar_position: 13
---

# Remove Subscription Seats

Remove seats from a Subscription. Seats can only be removed if they are unassigned. To unassign seats use the [update many](../licenses/update-many.md) method to set the `granteeId` of each seat to `null`.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.removeSeats('17830730-3214-4dda-8306-9bb8ae0e3a11', { decrement: 1 });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `RemoveSubscriptionSeatsOption`

| Option    | Type   | Description                                                                                                                                                                                                        | Required |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| decrement | number | The number of seats to be created                                                                                                                                                                                  | ✅       |
| proration | string | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Seat Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/decrementSubscriptionSeats)

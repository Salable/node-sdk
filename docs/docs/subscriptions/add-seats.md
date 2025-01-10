---
sidebar_position: 12
---

# Increment Subscription Seats

Adds seats to a Subscription. Initially the seats will be unassigned. To assign granteeIds to the seats use the [update many](../licenses/update-many.md) method.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.addSeats('d18642b3-6dc0-40c4-aaa5-6315ed37c744', { increment: 2 });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `{ increment: number, proration: string }`

| Option    | Type   | Description                                                                                                                                                                                                        | Required |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| increment | number | The number of seats to be created                                                                                                                                                                                  | ✅       |
| proration | string | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Seat Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/incrementSubscriptionSeats)

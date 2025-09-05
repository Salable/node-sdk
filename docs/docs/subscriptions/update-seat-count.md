---
sidebar_position: 12
---

# Update Subscription Seat Count


## Add seats

Increase a subscription's seat count. If the subscription's plan has a max seat limit you will not be able to exceed this. All created seats will be unassigned, to assign them use the [./subscriptions/manage-seats.md](manage seats) method.

### Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

await salable.subscriptions.updateSeatCount('d18642b3-6dc0-40c4-aaa5-6315ed37c744', { increment: 2 });
```

### Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `{ increment: number, proration?: string }`

| Option    | Type   | Description                                                                                                                                                                                                        | Required |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| increment | number | The number of seats to be created                                                                                                                                                                                  | ✅       |
| proration | string | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. | ❌       |

### Return Type

For more information about this request see our API documentation on [Subscription Seat Object](https://docs.salable.app/api/v3#tag/Subscriptions/operation/incrementSubscriptionSeats)

## Remove seats

Decrease a subscription's seat count. If the subscription's plan has a minimum seat limit you will not be able to go below this. Only unassigned seats can be removed, to unassign seats use the [./subscriptions/manage-seats.md](manage seats) method.

### Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

await salable.subscriptions.updateSeatCount('d18642b3-6dc0-40c4-aaa5-6315ed37c744', { decrement: 2 });
```

### Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `{ decrement: number, proration?: string }`

| Option    | Type   | Description                                                                                                                                                                                                        | Required |
|-----------| ------ |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| -------- |
| decrement | number | The number of seats that will be removed                                                                                                                                                                           | ✅       |
| proration | string | `create_prorations`: Will cause proration invoice items to be created when applicable (default). `none`: Disable creating prorations in this request. `always_invoice`: Always invoice immediately for prorations. | ❌       |

### Return Type

For more information about this request see our API documentation on [Subscription Seat Object](https://docs.salable.app/api/v3#tag/Subscriptions/operation/incrementSubscriptionSeats)

---
sidebar_position: 5
---

# Remove Subscription Seats

Remove seats from a subscription

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{API-KEY}');

const subscription = await salable.subscriptions.removeSeats(
  '41cf33a2-136e-4959-b5c7-73889ab94eff',
  {
    decrement: 2,
  }
);
```

## Parameters

### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid` of the subscription you wish to retrieve

### config (_required_)

_Type:_ `ISubscriptionRemoveSeatsParams`

All config options which can be passed in to this method

#### decrement (_required_)

_Type:_ `number`

The number of seats you wish to remove

## Return Type

void

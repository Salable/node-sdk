---
sidebar_position: 4
---

# Add Subscription Seats

Adds seats to a subscription

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const subscription = await salable.subscriptions.addSeats(
      '41cf33a2-136e-4959-b5c7-73889ab94eff',
      {
        increment: 2,
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid` of the subscription you wish to retrieve

### config (_required_)

_Type:_ `ISubscriptionAddSeatsParams`

All config options which can be passed in to this method

#### increment (_required_)

_Type:_ `number`

The number of seats you wish to add

## Return Type

void
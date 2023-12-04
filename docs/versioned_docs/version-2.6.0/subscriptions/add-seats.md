---
sidebar_position: 4
---

# Add Subscription Seats

Adds seats to a subscription

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.subscriptions.addSeats('{{SUBSCRIPTION_UUID}}', {
  increment: 2,
});
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription where the seats will be added

##### config (_required_)

_Type:_ `ISubscriptionAddSeatsParams`

All config options which can be passed in to this method

| Option    | Description                       |
| --------- | --------------------------------- |
| increment | The number of seats to be created |

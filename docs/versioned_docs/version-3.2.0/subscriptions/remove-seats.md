---
sidebar_position: 5
---

# Remove Subscription Seats

Remove seats from a Subscription. Seats can only be removed if they are unassigned. To unassign seats use the [update many](../licenses/update-many.md) method to set the `granteeId` of each seat to `null`.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.subscriptions.removeSeats('{{SUBSCRIPTION_UUID}}', { decrement: 2 });
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription the seats will be removed from

##### config (_required_)

_Type:_ `ISubscriptionRemoveSeatsParams`

| Option    | Description                       |
| --------- | --------------------------------- |
| decrement | The number of seats to be removed |

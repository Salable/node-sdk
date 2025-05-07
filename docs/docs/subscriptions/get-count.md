---
sidebar_position: 5
---

# Get Subscription Seat Count

This method returns the aggregate number of seats. The response is broken down by assigned, unassigned and the total. Seats with the status `CANCELED` are ignored.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const seatCount = await salable.subscriptions.getSeatCount('ef946d3d-f2fa-46f2-96d3-d67162540493');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

`uuid` of the subscription.

## Return Type

For more information about this request, see our API documentation on [subscription seat count](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionSeatCount).

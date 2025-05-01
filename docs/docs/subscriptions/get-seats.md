---
sidebar_position: 1
---

# Get Subscription Seats

Returns a list of seats on a subscription. Seats with the status `CANCELED` are ignored. Response uses cursor-based pagination.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getSeats('{{SUBSCRIPTION_UUID}}');
```

## Parameters

#### options

_Type:_ `GetSubscriptionSeatsOptions`

| Option      | Type   | Description                                                             | Required |
|-------------|--------|-------------------------------------------------------------------------|----------|
| cursor      | string | Cursor value, used for pagination                                       | ❌        |
| take        | number | The amount of subscriptions to fetch. Default: `20`                     | ❌        |


## Return Type

For more information about this request, see our API documentation on [get subscription seats](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionsSeats).

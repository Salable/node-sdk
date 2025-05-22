---
sidebar_position: 4
---

# Get seats

Returns a list of seats on a subscription. Seats with the status `CANCELED` are ignored. Response uses cursor-based pagination.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getSeats('0dfc9ce9-4dfd-4b20-bfe6-57eacbe45389');
```

## Parameters

#### options

_Type:_ `GetSubscriptionSeatsOptions`

| Option      | Type   | Description                                 | Required |
|-------------|--------|---------------------------------------------|----------|
| cursor      | string | Cursor value, used for pagination           | ❌        |
| take        | number | The number of seats to fetch. Default: `20` | ❌        |


## Return Type

For more information about this request, see our API documentation on [get subscription seats](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionsSeats).

---
sidebar_position: 1
---

# Get All Subscriptions

Returns a list of all the subscriptions created by your Salable organization.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getAll();
```

## Parameters

#### options

_Type:_ `GetSubscriptionOptions`

| Option | Type     | Description                                                               | Required |
| ------ | -------- | ------------------------------------------------------------------------- | -------- |
| status | string   | The status of the subscription, e.g. "ACTIVE" "CANCELED"                  | ❌       |
| email  | string   | The email of who purchased the subscription                               | ❌       |
| cursor | string   | Cursor value, used for pagination                                         | ❌       |
| take   | string   | The amount of subscriptions to fetch. Default: `20`                       | ❌       |
| expand | string[] | Specify which properties to expand. e.g `{ expand: ['product', 'plan'] }` | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptions)

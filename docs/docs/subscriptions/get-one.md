---
sidebar_position: 2
---

# Get One Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getOne('2694ae7b-8b0e-4954-b7eb-ceceb583a79b');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription to be returned

---

#### options

_Type:_ `GetSubscriptionOptions`

| Option | Type     | Description                                                      | Required |
| ------ | -------- | ---------------------------------------------------------------- | -------- |
| expand | string[] | Specify which properties to expand. e.g. `{ expand: 'product' }` | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionByUuid)

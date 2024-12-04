---
sidebar_position: 9
---

# Get Cancel Subscription Link

Returns a link to cancel a specific subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getCancelSubscriptionLink('{{subscriptionUuid}}');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription


## Return Type

For more information about this request see our API documentation on [Cancel Subscription Link Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionCancelLink)

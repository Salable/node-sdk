---
sidebar_position: 9
---

# Get Cancel Subscription Link

Returns a link to cancel a specific subscription.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

const subscription = await salable.subscriptions.getCancelSubscriptionLink('ecc6868e-3ba5-4f10-b955-5dd46beb9602');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription

## Return Type

For more information about this request see our API documentation on [Cancel Subscription Link Object](https://docs.salable.app/api/v3#tag/Subscriptions/operation/getSubscriptionCancelLink)

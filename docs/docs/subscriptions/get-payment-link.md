---
sidebar_position: 7
---

# Get a Subscription Update Payment Link

Returns the update payment link for a specific subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getPortalLink('subscription_1');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription

## Return Type

For more information about this request see our API documentation on [Subscription Payment Link Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionUpdatePaymentLink)

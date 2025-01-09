---
sidebar_position: 10
---

# Get a Subscription Payment Method

Returns the payment method used to pay for a subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getPaymentMethod('07b3b494-a8f0-44f7-b051-add30c8c6002');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription

## Return Type

For more information about this request see our API documentation on [Subscription Payment Method Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionPaymentMethod)

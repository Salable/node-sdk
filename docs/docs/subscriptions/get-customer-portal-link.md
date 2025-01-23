---
sidebar_position: 8
---

# Get a Customer Portal Link for a Subscription

Returns the customer portal link for a subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getOne('a2188e78-2490-408e-93f6-35f829d05b49');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription to be returned

## Return Type

For more information about this request see our API documentation on [Subscription Portal Link Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionCustomerPortalLink)

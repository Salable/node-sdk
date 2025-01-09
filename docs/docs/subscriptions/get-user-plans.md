---
sidebar_position: 5
---

# Get Switchable Plans for a Subscribed User

Returns the details of a single subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getSwitchablePlans('e0517f96-1ac0-4631-a52b-56ace9d1168c');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionUpdatablePlans)

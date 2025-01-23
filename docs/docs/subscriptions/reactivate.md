---
sidebar_position: 11
---

# Reactivate a Subscription

This method reactivates a subscription scheduled for cancellation before the billing period has passed.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.reactivateSubscription('9237877c-baae-46d0-b482-cb0147179e30');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription to be returned

## Return Type

Returns void

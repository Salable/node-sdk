---
sidebar_position: 1
---

# Get One Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const subscription = await salable.subscriptions.getOne('{{SUBSCRIPTION_UUID}}');
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription to be returned

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionByUuid)

---
sidebar_position: 1
---

# Get Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
const { SalableApi } = require('@salable/node-sdk');

const salable = new SalableApi('API-KEY');

const subscription = await salable.subscriptions.getSubscription(
  '41cf33a2-136e-4959-b5c7-73889ab94eff'
);
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription to be returned

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionByUuid)

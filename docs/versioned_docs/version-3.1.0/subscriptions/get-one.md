---
sidebar_position: 1
---

# Get One Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const subscription = await salable.subscriptions.getOne('{{SUBSCRIPTION_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid`

## Return Type

For more information about this request see our api documentation on [Subscription Object](https://docs.salable.app/api#tag/Subscriptions/operation/getSubscriptionByUuid)

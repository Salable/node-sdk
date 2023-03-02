---
sidebar_position: 1
---

# Get Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
const { SalableApi } = require("@Salable/node-sdk");
(async () => {
  const api = new SalableApi("API-KEY");
  try {
    const subscription = await api.subscriptions.getSubscription(
      "41cf33a2-136e-4959-b5c7-73889ab94eff"
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid` of the subscription you wish to retrieve

## Return Type

Promise of a subscription object

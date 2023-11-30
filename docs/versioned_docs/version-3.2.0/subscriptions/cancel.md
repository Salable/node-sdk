---
sidebar_position: 3
---

# Cancel a Subscription

Cancels a subscription.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const subscription = await salable.subscriptions.cancel(
      '41cf33a2-136e-4959-b5c7-73889ab94eff',
      'end'
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription to be canceled of the subscription you wish to retrieve

##### when (_required_)

_Type:_ `end` | `now`

| When | Description                                                              |
| ---- | ------------------------------------------------------------------------ |
| now  | Immediately cancels the Subscription                                     |
| end  | Cancels the Subscription at the end of the Subscription's billing period |

## Return Type

void

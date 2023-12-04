---
sidebar_position: 3
---

# Cancel a Subscription

Cancels a Subscription with options for when it terminates.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const subscription = await salable.subscriptions.cancel(
  '41cf33a2-136e-4959-b5c7-73889ab94eff',
  'end'
);
```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

The `uuid` of the Subscription to be canceled

##### when (_required_)

_Type:_ `end` | `now`

| When | Description                                                |
| ---- | ---------------------------------------------------------- |
| now  | Immediately cancels the Subscription                       |
| end  | Cancels the Subscription at the end of it's billing period |

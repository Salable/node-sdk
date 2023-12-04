---
sidebar_position: 6
---

# Cancel a Subscription

Cancels a Subscription with options for when it terminates.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.subscriptions.cancel('{{SUBSCRIPTION_UUID}}', 'end');
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

## Return Type

Return void

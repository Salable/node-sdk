---
sidebar_position: 6
---

# Cancel a Subscription

Cancels a Subscription with options for when it terminates.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.cancel('{{subscriptionUuid}}', { when: 'end' });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription to be canceled

#### options (_required_)

_Type:_ `{ when: 'end' | 'now' }`

| When | Description                                                |
| ---- | ---------------------------------------------------------- |
| now  | Immediately cancels the Subscription                       |
| end  | Cancels the Subscription at the end of it's billing period |

## Return Type

Returns void

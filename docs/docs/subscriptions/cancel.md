---
sidebar_position: 6
---

# Cancel a Subscription

Cancels a Subscription with options for when it terminates.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

await salable.subscriptions.cancel('ce8cc0cb-a180-4d90-985b-0890d5ac6cbb', { when: 'end' });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription to be canceled

##### options (_required_)

_Type:_ `CancelSubscriptionOptions`

| Option | Type | Description                                                                                                    | Required |
| ------ | ---- | -------------------------------------------------------------------------------------------------------------- | -------- |
| when   | enum | `now`: Immediately cancels the Subscription. `end`: Cancels the Subscription at the end of it's billing period | ✅       |

## Return Type

Returns void

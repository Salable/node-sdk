---
sidebar_position: 13
---

# Update Subscription

Update properties on a subscription.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

await salable.subscriptions.update('17830730-3214-4dda-8306-9bb8ae0e3a11', { owner: 'orgId_2' });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `UpdateSubscriptionInput`

| Option    | Type   | Description                                     | Required |
|-----------|--------|-------------------------------------------------|----------|
| owner     | string | The ID of the entity that owns the subscription | ❌        |

## Return Type

For more information about this request see our API documentation on [Subscription update](https://docs.salable.app/api/v3#tag/Subscriptions/operation/updateSubscriptionByUuid)

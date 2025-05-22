---
sidebar_position: 1
---

# Create

Create a subscription with no payment integration.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.create({
  planUuid: '41192f3a-fcfd-46e2-83db-0fd6a288ad5f',
  owner: 'orgId_1234',
  granteeId: 'userId_1',
});
```

## Parameters

#### Data (_required_)

_Type:_ `CreateSubscriptionInput`

| Option            | Type    | Description                                                                                                                                                                                                                 | Required |
|-------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| planUuid          | string  | The ID of the plan the subscription will belong to                                                                                                                                                                          | ✅        |
| granteeId         | string  | The ID of the entity who will be assigned to the license. If the plan is per seat and the minimum seat count is above one the granteeId will be assigned to the first license. The rest of the licenses will be unassigned. | ✅        |
| owner             | string  | The ID of the entity own the subscription.                                                                                                                                                                                  | ✅        |
| cancelAtPeriodEnd | boolean | If true the subscription will cancel after the expiry date has past. If false the subscription will renew.                                                                                                                  | ❌        |
| expiryDate        | string  | Overrides the plan default plan interval and length for the first cycle.                                                                                                                                                    | ❌        |
| status            | string  | The status of the create subscription. Allowed values are "ACTIVE" and "TRIALING".                                                                                                                                          | ❌        |

## Return Type

For more information about this request see our API documentation on [Subscription Create](https://docs.salable.app/api/v2#tag/Subscriptions/operation/createSubscripion)
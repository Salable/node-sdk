---
sidebar_position: 13
---

# Manage Seats

Assign, unassign and replace grantees on seats.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.manageSeats('17830730-3214-4dda-8306-9bb8ae0e3a11', [
  {
    type: 'assign',
    granteeId: 'userId_1'
  },
  {
    type: 'unassign',
    granteeId: 'userId_2'
  },
  {
    type: 'replace',
    granteeId: 'userId_3',
    newGranteeId: 'userId_4',
  }
]);
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `ManageSeatOptions[]`

| Option       | Type   | Description                                                                                                                                                                                                                               | Required |
|--------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| type         | enum   | `assign`: Will assign an empty seat to the provided granteeId. `unassign`: Will unassign the seat from the provided granteeId. `replace`: Unassigns the seat from the provided granteeId and then assigns it to the `newGranteeId` value. | ✅        |
| granteeId    | string | The granteeId the action is being performed on.                                                                                                                                                                                           | ✅        |
| newGranteeId | string | Only applicable to the `replace` action. The new granteeId on the seat.                                                                                                                                                                   | ❌  |

## Return Type

For more information about this request, see our API documentation on [subscription manage seats](https://docs.salable.app/api/v2#tag/Subscriptions/operation/manageSubscriptionSeats)
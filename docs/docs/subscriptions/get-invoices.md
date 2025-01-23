---
sidebar_position: 4
---

# Get Subscription Invoices

Returns a list of invoices for a subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getInvoices('5fa0fbfa-5fbf-4fee-b286-ed1cb25379f9');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription

#### options

_Type:_ `GetAllInvoicesOptions`

| Option      | Type   | Description                                         | Required |
|-------------|--------|-----------------------------------------------------| -------- |
| cursor      | string | Cursor value, used for pagination                   | ❌       |
| take        | number | The amount of subscriptions to fetch. Default: `10` | ❌       |

## Return Type

For more information about this request see our API documentation on [Subscription Invoice Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionInvoices)

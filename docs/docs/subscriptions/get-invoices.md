---
sidebar_position: 4
---

# Get Subscription Invoices

Returns a list of invoices for a subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const subscription = await salable.subscriptions.getInvoices('{{subscriptionUuid}}');
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the subscription


## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api/v2#tag/Subscriptions/operation/getSubscriptionInvoices)

---
sidebar_position: 1
---

# Get One Subscription

Returns the details of a single subscription.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const subscription = await salable.subscriptions.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');

```

## Parameters

##### subscriptionId (_required_)

_Type:_ `string`

Subscription `uuid` of the subscription you wish to retrieve

## Return Type

For more information about this request see our API documentation on [Subscription Object](https://docs.salable.app/api#tag/Subscriptions/operation/getSubscriptionByUuid)

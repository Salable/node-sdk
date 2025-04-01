---
sidebar_position: 14
---

# Add a coupon to a subscription

Adds the specified coupon to the subscription. Adding coupons do not trigger immediate adjustments and are applied in the following billing cycle.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

await salable.subscriptions.addCoupon('d18642b3-6dc0-40c4-aaa5-6315ed37c744', { couponUuid: '4c064ace-57c4-4618-bd79-a0e8029f9904' });
```

## Parameters

#### subscriptionUuid (_required_)

_Type:_ `string`

The UUID of the Subscription

#### Options (_required_)

_Type:_ `{ couponUuid: string }`

| Option     | Type   | Description            | Required |
| ---------- | ------ | ---------------------- | -------- |
| couponUuid | string | The UUID of the coupon | ✅        |

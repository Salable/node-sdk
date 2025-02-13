---
sidebar_position: 2
---

# Get Checkout Link

Returns the checkout link for a plan. This endpoint will only work for paid Plans.

## Code Sample

#### Required parameters

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const checkoutLink = await salable.plans.getCheckoutLink('1de11022-ef14-4e22-94e6-c5b0652e497f', {
  cancelUrl: 'https://example.com/cancel',
  successUrl: 'https://example.com/success',
  granteeId: 'userId-1',
  member: 'orgId_1',
});
```

#### Customer details

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const checkoutLink = await salable.plans.getCheckoutLink('15914694-5ff1-40d7-8ccb-7acc00586508', {
  cancelUrl: 'https://example.com/cancel',
  successUrl: 'https://example.com/success',
  granteeId: 'userId-1',
  member: 'orgId_1',
  customerEmail: 'person@company.com',
});
```

## Parameters

#### planUuid (_required_)

_Type:_ `string`

The `uuid` of the Plan to get the checkout link from

#### options (_required_)

_Type:_ `GetPlanCheckoutOptions`

Query parameters to be passed in to the checkout config

| **Parameter** | **Type** | **Description**                                                                                                                                                                           | **Required** |
|:--------------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------:|
| successUrl    | string   | The URL to send users if they have successfully completed a purchase                                                                                                                      |      ✅       |
| cancelUrl     | string   | The URL to send users to if the transaction fails.                                                                                                                                        |      ✅       |
| granteeId     | string   | Value to use as granteeId on Plan                                                                                                                                                         |      ✅       |
| member        | string   | The purchaser of the license                                                                                                                                                              |      ✅       |
| owner         | string   | The ID of the entity who will own the subscription. Default is the value given to member.                                                                                                 |      ❌       |
| promoCode     | string   | Enables the promo code field in Stripe checkout. Cannot be used with promoCode.                                                                                                           |      ❌       |
| currency      | string   | Shortname of the currency to be used in the checkout. The currency must be added to the plan's product in Salable. If not specified, it defaults to the currency selected on the product. |      ❌       |
| quantity      | string   | Only applicable for per seat plans. Set the amount of seats the customer pays for in the checkout.                                                                                        |      ❌       |
| customerEmail | string   | Pre fills email for checkout customer                                                                                                                                                     |      ❌       |
| automaticTax  | string   | Automatically calculate tax on checkout based on customers location and your Stripe settings.                                                                                             |      ❌       |

## Return Type

For more information about this request see our API documentation on [Plan checkout link](https://docs.salable.app/api/v2#tag/Plans/operation/getPlanCheckoutLink)

---
sidebar_position: 3
---

# Get Pricing Table for a Product

Returns all necessary data on a Product to be able to display a pricing table. Every active plan on the product will be added to the table in the sort order of free plans, paid plans price and then coming soon plans.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.products.getPricingTable('{{PRODUCT_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
  },
});
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

The `uuid` of the Product to build the pricing table for

---

##### queryParams (_required_)

_Type:_ `PricingTableParameters`

Query parameters to be passed in to the checkout config

**globalPlanOptions**  
The `globalPlanOptions` are default parameters that apply to all plans listed in the pricing table. These settings apply to each plan unless overridden by `individualPlanOptions`.

| **Parameter**     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Required** |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| successUrl        | The URL to send users if they have successfully completed a purchase                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |      ✅      |
| cancelUrl         | The URL to send users to if the transaction fails.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |      ✅      |
| member            | The purchaser of the license                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |      ✅      |
| granteeId         | Value to use as granteeId on Plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |      ✅      |
| marketingConsent  | Opt user in to marketing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |      ❌      |
| couponCode        | Coupon code to be used in checkout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |      ❌      |
| promoCode         | Pre fills Promotion Code in checkout to offer discounts. The Code must be set in your payment provider. If you payment provider is paddle, you can pass the coupon code created in paddle dashboard. If your payment provider is Stripe use the Promotion Code ID which can be found in the Stripe dashboard. This cannot be edited by customer on checkout for stripe. If you want customer to enter the promo code field by themselves, please use allowPromoCodeparameter instead. To create promo code in stripe go to this URL, then create a coupon code. On the coupon code details page you will find promo code section, create promo code as per your need and use the promo code id to pass in this parameter, e.g.promo_xyzabc |      ❌      |
| allowPromoCode    | Enables Promotion Code field in checkout. For paddle this is true by default, if you pass false then it will hide promo code field in checkout. For stripe, either this parameter or the promoCode parameter has to be passed as both are not allowed together. If passed as true for stripe, it will show promo code field in checkout, if you want to prefill the promo code field in checkout then use promoCode parameter and not this one.                                                                                                                                                                                                                                                                                            |      ❌      |
| customer.email    | Pre fills email for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |      ❌      |
| customer.country  | Pre fills country for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |      ❌      |
| customer.postcode | Pre fills postcode for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |      ❌      |

##### Paddle specific parameters

| Parameter       | Description                                                        | Required |
| --------------- | ------------------------------------------------------------------ | :------: |
| vat.number      | Prefill the checkout form with the customer's VAT number           |    ❌    |
| vat.companyName | Prefill the checkout form with the customer's Company Name for VAT |    ❌    |
| vat.street      | Prefill the checkout form with the customer's Street for VAT       |    ❌    |
| vat.city        | Prefill the checkout form with the customer's city for VAT         |    ❌    |
| vat.state       | Prefill the checkout form with the customer's state for VAT        |    ❌    |
| vat.country     | Prefill the checkout form with the customer's country for VAT      |    ❌    |
| vat.postcode    | Prefill the checkout form with the customer's postcode for VAT     |    ❌    |
| customMessage   | Add a message to show in Paddle checkout                           |    ❌    |

**individualPlanOptions**

You can use `individualPlanOptions` to override `globalPlanOptions` for any plan. To do this, assign an override object to `individualPlanOptions` using the `planUuid` as the key. Note that the override capability is limited to specific parameters: `successUrl`, `cancelUrl`, and `granteeId`.

| **Parameter** | **Description**                                                      | **Required** |
| :------------ | :------------------------------------------------------------------- | :----------: |
| successUrl    | The URL to send users if they have successfully completed a purchase |      ❌      |
| cancelUrl     | The URL to send users to if the transaction fails.                   |      ❌      |
| granteeId     | Value to use as granteeId on Plan                                    |      ❌      |

##### Code sample using individualPlanOptions

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.products.getPricingTable('{{PRODUCT_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
  },
  individualPlanOptions: {
    '{{PLAN_UUID}}': {
      granteeId: 'userId_2',
    },
  },
});
```

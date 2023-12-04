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

Below is the list of properties than can be used in the `queryParams` argument.

**globalPlanOptions**  
The `globalPlanOptions` are default parameters that apply to all plans listed in the pricing table. These settings apply to each plan unless overridden by `individualPlanOptions`.

| **Parameter**     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Required** |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| successUrl        | The URL to send users if they have successfully completed a purchase                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |      ✅      |
| cancelUrl         | The URL to send users to if the transaction fails.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |      ✅      |
| member            | The purchaser of the license                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |      ✅      |
| granteeId         | Value to use as granteeId on Plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |      ✅      |
| marketingConsent  | Opt user in to marketing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |      ❌      |
| couponCode        | Coupon code to be used in checkout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |      ❌      |
| promoCode         | If your service offers promotional codes, use the `promoCode` parameter to automatically fill in these codes during checkout. Make sure these codes are already configured in your payment provider.<br/>**Stripe**<br/>Provide the Stripe Promotion Code ID to the `promoCode` parameter, you can find this in your Stripe dashboard. For guidance on creating a promotion code in Stripe, consult their [documentation](https://stripe.com/docs/billing/subscriptions/coupons). Make sure to use the ID and not the promo code itself.<br/>_Note_: If a promo code is applied this way, customers will not have the ability to modify it in the checkout. If you would prefer to give customers the option to enter a promo code themselves, you can use the `allowPromoCode` parameter instead.<br/>**Paddle**<br/>Pass the coupon code that you have created in the Paddle dashboard directly into the `promoCode` parameter. Users can modify this manually in the checkout later. |      ❌      |
| allowPromoCode    | The `allowPromoCode` parameter controls the visibility and functionality of the Promotion Code field in your checkout process.<br/>**Stripe**<br/>In Stripe, you can use either `allowPromoCode` or `promoCode`, but not both simultaneously. Setting `allowPromoCode` to true displays the promo code field, allowing customers to enter a code.<br/>_Note_: If you would prefer to use a pre-filled specific promo code, use the `promoCode` parameter with the Promotion Code ID from your Stripe dashboard. Remember, using `promoCode` in Stripe means customers cannot modify the code during checkout.<br/>**Paddle**<br/>By default, this is set to true. Setting `allowPromoCode` to false will hide the promo code field in the checkout. If you're using the `promoCode` parameter to pre-fill a code, the user can still modify it during checkout.                                                                                                                         |      ❌      |
| customer.email    | Pre fills email for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |      ❌      |
| customer.country  | Pre fills country for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |      ❌      |
| customer.postcode | Pre fills postcode for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |      ❌      |

##### Paddle specific parameters

| Parameter       | Description                                                        | Required |
| :-------------- | :----------------------------------------------------------------- | :------: |
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

## Return Type

For more information about this request see our API documentation on [Pricing Table](https://docs.salable.app/api#tag/Pricing-Tables/operation/getPricingTableByUuid)

## Return Type

For more information about this request see our API documentation on [Product Pricing Table](https://docs.salable.app/api#tag/Products/operation/getProductPricingTable)

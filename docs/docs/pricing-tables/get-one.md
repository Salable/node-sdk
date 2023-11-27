---
sidebar_position: 3
---

# Get One Pricing Table

Returns all necessary data on a display a pricing table.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const pricingTable = await salable.pricingTables.getOne('pricing-table-uuid', {
      globalPlanOptions: {
        granteeId: 'userId_1',
        member: 'orgId_1',
        cancelUrl: 'https://example.com/cancel',
        successUrl: 'https://example.com/success',
      },
    });
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### pricingTableUuid (_required_)

_Type:_ `string`

Pricing Table `uuid`

---

### queryParams (_required_)

_Type:_ `PricingTableParameters`

Query parameters to be passed in to the checkout config

#### globalPlanOptions

Parameters set in globalPlanOptions will be used for all plans in the pricing table by default.

|   **Parameter**   |                                                                                                                                                                                                                                                                                                                                                              **Description**                                                                                                                                                                                                                                                                                                                                                               | **Required** |
| :---------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------: |
|    successUrl     |                                                                                                                                                                                                                                                                                                                                    The URL to send users if they have successfully completed a purchase                                                                                                                                                                                                                                                                                                                                    |      ✅      |
|     cancelUrl     |                                                                                                                                                                                                                                                                                                                                             The URL to send users to if the transaction fails.                                                                                                                                                                                                                                                                                                                                             |      ✅      |
|      member       |                                                                                                                                                                                                                                                                                                                                                        The purchaser of the license                                                                                                                                                                                                                                                                                                                                                        |      ✅      |
|     granteeId     |                                                                                                                                                                                                                                                                                                                                                     Value to use as granteeId on Plan                                                                                                                                                                                                                                                                                                                                                      |      ✅      |
| marketingConsent  |                                                                                                                                                                                                                                                                                                                                                          Opt user in to marketing                                                                                                                                                                                                                                                                                                                                                          |      ❌      |
|    couponCode     |                                                                                                                                                                                                                                                                                                                                                   Coupon code to be used on the checkout                                                                                                                                                                                                                                                                                                                                                   |      ❌      |
|     promoCode     | Pre fills Promotion Code in checkout to offer discounts. The Code must be set in your payment provider. If you payment provider is paddle, you can pass the coupon code created in paddle dashboard. If your payment provider is Stripe use the Promotion Code ID which can be found in the Stripe dashboard. This cannot be edited by customer on checkout for stripe. If you want customer to enter the promo code field by themselves, please use allowPromoCodeparameter instead. To create promo code in stripe go to this URL, then create a coupon code. On the coupon code details page you will find promo code section, create promo code as per your need and use the promo code id to pass in this parameter, e.g.promo_xyzabc |      ❌      |
|  allowPromoCode   |                                                                                                                                              Enables Promotion Code field in checkout. For paddle this is true by default, if you pass false then it will hide promo code field in checkout. For stripe, either this parameter or the promoCode parameter has to be passed as both are not allowed together. If passed as true for stripe, it will show promo code field in checkout, if you want to prefill the promo code field in checkout then use promoCode parameter and not this one.                                                                                                                                               |      ❌      |
|  customer.email   |                                                                                                                                                                                                                                                                                                                                                  Prepopulated email for checkout customer                                                                                                                                                                                                                                                                                                                                                  |      ❌      |
| customer.country  |                                                                                                                                                                                                                                                                                                                                                 Prepopulated country for checkout customer                                                                                                                                                                                                                                                                                                                                                 |      ❌      |
| customer.postcode |                                                                                                                                                                                                                                                                                                                                                Prepopulated postcode for checkout customer                                                                                                                                                                                                                                                                                                                                                 |      ❌      |
|    vat.number     |                                                                                                                                                                                                                                                                                                                                          Prefill the checkout form with the customer's VAT number                                                                                                                                                                                                                                                                                                                                          |      ❌      |
|  vat.companyName  |                                                                                                                                                                                                                                                                                                                                     Prefill the checkout form with the customer's Company Name for VAT                                                                                                                                                                                                                                                                                                                                     |      ❌      |
|    vat.street     |                                                                                                                                                                                                                                                                                                                                        Prefill the checkout form with the customer's Street for VAT                                                                                                                                                                                                                                                                                                                                        |      ❌      |
|     vat.city      |                                                                                                                                                                                                                                                                                                                                         Prefill the checkout form with the customer's city for VAT                                                                                                                                                                                                                                                                                                                                         |      ❌      |
|     vat.state     |                                                                                                                                                                                                                                                                                                                                        Prefill the checkout form with the customer's state for VAT                                                                                                                                                                                                                                                                                                                                         |      ❌      |
|    vat.country    |                                                                                                                                                                                                                                                                                                                                       Prefill the checkout form with the customer's country for VAT                                                                                                                                                                                                                                                                                                                                        |      ❌      |
|   vat.postcode    |                                                                                                                                                                                                                                                                                                                                       Prefill the checkout form with the customer's postcode for VAT                                                                                                                                                                                                                                                                                                                                       |      ❌      |
|   customMessage   |                                                                                                                                                                                                                                                                                                                                                  Add a message to show in Paddle checkout                                                                                                                                                                                                                                                                                                                                                  |      ❌      |

#### individualPlanOptions

Parameters set in globalPlanOptions can be overridden on a per-plan basis by using the individualPlanOptions property. To do this set a key in the individualPlanOptions object to the uuid of the plan you want to override. Only successUrl, cancelUrl and granteeId can be set on a per-plan basis.

| **Parameter** |                           **Description**                            | **Required** |
| :-----------: | :------------------------------------------------------------------: | :----------: |
|  successUrl   | The URL to send users if they have successfully completed a purchase |      ❌      |
|   cancelUrl   |          The URL to send users to if the transaction fails.          |      ❌      |
|   granteeId   |                  Value to use as granteeId on Plan                   |      ❌      |

##### Code sample using individualPlanOptions

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const pricingTable = await salable.pricingTables.getOne('pricing-table-uuid', {
      globalPlanOptions: {
        granteeId: 'userId_1',
        member: 'orgId_1',
        cancelUrl: 'https://example.com/cancel',
        successUrl: 'https://example.com/success',
      },
      individualPlanOptions: {
        'plan-uuid': {
          granteeId: 'userId_2',
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
})();
```

---
sidebar_position: 3
---

# Get One Pricing Table

Returns all necessary data on a display a pricing table.

## Code Sample

#### Required parameters

<details open>
<summary>Example with required properties set</summary>

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.pricingTables.getOne('{{PRICING_TABLE_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
  },
});
```

</details>

#### Individual plans

<details open>
<summary>Example with individual plan properties set</summary>

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.pricingTables.getOne('{{PRICING_TABLE_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
  },
  individualPlanOptions: {
    '{{PLAN_UUID}}': {
      granteeId: 'userId_2',
      cancelUrl: 'https://example.com/cancel2',
      successUrl: 'https://example.com/success2',
    },
  },
});
```

</details>

#### Customer details

<details open>
<summary>Example with customer details set</summary>

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.pricingTables.getOne('{{PRICING_TABLE_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
    customer: {
      email: 'person@company.com',
    },
  },
});
```

</details>

#### VAT (Paddle only)

<details open>
<summary>Example with vat details set</summary>

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const pricingTable = await salable.pricingTables.getOne('{{PRICING_TABLE_UUID}}', {
  globalPlanOptions: {
    granteeId: 'userId_1',
    member: 'orgId_1',
    cancelUrl: 'https://example.com/cancel',
    successUrl: 'https://example.com/success',
    vat: {
      number: 'GB123456789',
      companyName: 'Company',
      street: '1 Street Name',
      city: 'City',
      state: 'State',
      country: 'GB',
      postcode: 'NR1 1RN',
    },
  },
});
```

</details>

## Parameters

##### pricingTableUuid (_required_)

_Type:_ `string`

The `uuid` of the Pricing Table to build

---

##### queryParams (_required_)

_Type:_ `PricingTableParameters`

Below is the list of properties than can be used in the `queryParams` argument.

**globalPlanOptions**  
The `globalPlanOptions` are default parameters that apply to all plans listed in the pricing table. These settings apply to each plan unless overridden by `individualPlanOptions`.

| **Parameter**    | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Required** |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| successUrl       | The URL to send users if they have successfully completed a purchase                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |      ✅      |
| cancelUrl        | The URL to send users to if the transaction fails.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |      ✅      |
| member           | The purchaser of the license                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |      ✅      |
| granteeId        | Value to use as granteeId on Plan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |      ✅      |
| marketingConsent | Opt user in to marketing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |      ❌      |
| couponCode       | Coupon code to be used in checkout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |      ❌      |
| promoCode        | If your service offers promotional codes, use the `promoCode` parameter to automatically fill in these codes during checkout. Make sure these codes are already configured in your payment provider.<br/>**Stripe**<br/>Provide the Stripe Promotion Code ID to the `promoCode` parameter, you can find this in your Stripe dashboard. For guidance on creating a promotion code in Stripe, consult their [documentation](https://stripe.com/docs/billing/subscriptions/coupons). Make sure to use the ID and not the promo code itself.<br/>_Note_: If a promo code is applied this way, customers will not have the ability to modify it in the checkout. If you would prefer to give customers the option to enter a promo code themselves, you can use the `allowPromoCode` parameter instead.<br/>**Paddle**<br/>Pass the coupon code that you have created in the Paddle dashboard directly into the `promoCode` parameter. Users can modify this manually in the checkout later. |      ❌      |
| allowPromoCode   | The `allowPromoCode` parameter controls the visibility and functionality of the Promotion Code field in your checkout process.<br/>**Stripe**<br/>In Stripe, you can use either `allowPromoCode` or `promoCode`, but not both simultaneously. Setting `allowPromoCode` to true displays the promo code field, allowing customers to enter a code.<br/>_Note_: If you would prefer to use a pre-filled specific promo code, use the `promoCode` parameter with the Promotion Code ID from your Stripe dashboard. Remember, using `promoCode` in Stripe means customers cannot modify the code during checkout.<br/>**Paddle**<br/>By default, this is set to true. Setting `allowPromoCode` to false will hide the promo code field in the checkout. If you're using the `promoCode` parameter to pre-fill a code, the user can still modify it during checkout.                                                                                                                         |      ❌      |
| customer.email   | Pre fills email for checkout customer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |      ❌      |

See [code example](#customer-details) with customer details

##### Paddle specific parameters

| Parameter         | Description                                                                              | Required |
| :---------------- | :--------------------------------------------------------------------------------------- | :------: |
| vat.number        | Prefill the checkout form with the customer's VAT number                                 |    ❌    |
| vat.companyName   | Prefill the checkout form with the customer's Company Name for VAT                       |    ❌    |
| vat.street        | Prefill the checkout form with the customer's Street for VAT                             |    ❌    |
| vat.city          | Prefill the checkout form with the customer's city for VAT                               |    ❌    |
| vat.state         | Prefill the checkout form with the customer's state for VAT                              |    ❌    |
| vat.country       | Prefill the checkout form with the customer's country for VAT. ISO country codes format. |    ❌    |
| vat.postcode      | Prefill the checkout form with the customer's postcode for VAT                           |    ❌    |
| customer.country  | Pre fills country for checkout customer                                                  |    ❌    |
| customer.postcode | Pre fills postcode for checkout customer                                                 |    ❌    |
| customMessage     | Add a message to show in Paddle checkout                                                 |    ❌    |

See [code example](#vat-paddle-only) with VAT parameters

**individualPlanOptions**

You can use `individualPlanOptions` to override `globalPlanOptions` for any plan. To do this, assign an override object to `individualPlanOptions` using the `planUuid` as the key. Note that the override capability is limited to specific parameters: `successUrl`, `cancelUrl`, and `granteeId`.

| **Parameter** | **Description**                                                      | **Required** |
| :------------ | :------------------------------------------------------------------- | :----------: |
| successUrl    | The URL to send users if they have successfully completed a purchase |      ❌      |
| cancelUrl     | The URL to send users to if the transaction fails.                   |      ❌      |
| granteeId     | Value to use as granteeId on Plan                                    |      ❌      |

See [code example](#individual-plans) for individual plans

## Return Type

For more information about this request see our API documentation on [Pricing Table](https://docs.salable.app/api/v2#tag/Pricing-Tables/operation/getPricingTableByUuid)

import { ApiRequest, TVersion, Version } from '..';
import {
  Plan,
  PlanCheckout,
  PlanFeature,
  PlanCapability,
  PlanCurrency,
} from '../types';
import { v2PlanMethods } from './v2';

export type PlanVersions = {
  [Version.V2]: {
    /**
     *  Retrieves information about a plan by its UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     *  @param {string} planUuid - The UUID of the plan
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.expand - Items Enum: `"capabilities" "capabilities.capability" "features" "features.feature" "features.enumValue" "currencies" "currencies.currency" "generateCheckoutLink"`
     * Additional properties to expand the plan's relations as comma separated values eg expand=["currencies","features"]
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.successUrl - The URL to send users to if they successfully complete a purchase. It must be an absolute URL.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.cancelUrl - The URL to send users to if the transaction fails. It must be an absolute URL.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.granteeId - The unique identifier for the grantee.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.member - The ID of the member who will manage the license.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.promoCode - Used to pre-fill the promo code in Stripe checkout, use the promo code ID from the Stripe dashboard. Customers cannot edit this field during checkout. If you prefer to allow customers to enter the promo code themselves, use allowPromoCode instead.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.allowPromoCode - Enables the promo code field in Stripe checkout. Cannot be used with promoCode.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.customerEmail - Pre-fills the customer email in Stripe checkout
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.customerId - The ID of an existing customer in your payment integration. This will pre-fill the email, card details and postcode at checkout.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.currency - Uses the currency short name e.g. USD, defaults to the default currency on the Product which the Plan is linked to.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string;}} options.automaticTax - Automatically calculate tax on checkout based on customers location and your Stripe settings.
     *
     * @returns {Promise<IPlan>}
     */
    getOne: (
      planUuid: string,
      options?: {
        expand?: string[];
        successUrl?: string;
        cancelUrl?: string;
        granteeId?: string;
        member?: string;
        promoCode?: string;
        allowPromoCode?: boolean;
        customerEmail?: string;
        customerId?: string;
        currency?: string;
        automaticTax?: string;
      },
    ) => Promise<Plan>;

    /**
     * Retrieves a checkout link for a specific plan. The checkout link can be used by customers to purchase the plan.
     *
     * @param  {string} planUuid The UUID of the plan
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.expand - Items Enum: `"capabilities" "capabilities.capability" "features" "features.feature" "features.enumValue" "currencies" "currencies.currency" "generateCheckoutLink"`
     * Additional properties to expand the plan's relations as comma separated values eg expand=["currencies","features"]
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.successUrl - The URL to send users to if they successfully complete a purchase. It must be an absolute URL.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.cancelUrl - The URL to send users to if the transaction fails. It must be an absolute URL.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.granteeId - The unique identifier for the grantee.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.member - The ID of the member who will manage the license.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.promoCode - Used to pre-fill the promo code in Stripe checkout, use the promo code ID from the Stripe dashboard. Customers cannot edit this field during checkout. If you prefer to allow customers to enter the promo code themselves, use allowPromoCode instead.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.allowPromoCode - Enables the promo code field in Stripe checkout. Cannot be used with promoCode.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.customerEmail - Pre-fills the customer email in Stripe checkout
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.customerId - The ID of an existing customer in your payment integration. This will pre-fill the email, card details and postcode at checkout.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.currency - Uses the currency short name e.g. USD, defaults to the default currency on the Product which the Plan is linked to.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.automaticTax - Automatically calculate tax on checkout based on customers location and your Stripe settings.
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.quantity - Set the amount of seats a customer will pay for in the checkout. This value cannot be lower than the Plan's minimum seat amount. (Only available on per seat plans)
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.changeQuantity - Allows the customer to set how many seats they will purchase in the checkout but will not be able to go below the plan's minimum seat amount. (Only available on per seat plans)
     *  @param {{ expand?: string[]; successUrl?: string; cancelUrl?: string; granteeId?: string; member?: string; promoCode?: string; allowPromoCode?: boolean; customerEmail?: string; customerId?: string; currency?: string; automaticTax?: string; quantity?: string; changeQuantity?: string; requirePaymentMethod?: enum; }} options.requirePaymentMethod -Default: `true`
     *
     * Enum: `true` `false`
     *
     * Setting this value to 'false' means that users can start a Stripe trial without providing a payment method upfront. Payment method will always be required if a subscription has no trial period.
     *
     * @returns {Promise<PlanCheckout>}
     */
    getCheckoutLink: (
      planUuid: string,
      options: {
        successUrl: string;
        cancelUrl: string;
        granteeId: string;
        member: string;
        promoCode?: string;
        allowPromoCode?: boolean;
        customerEmail?: string;
        customerId?: string;
        currency?: string;
        automaticTax?: string;
        quantity?: string;
        changeQuantity?: string;
        requirePaymentMethod?: 'true' | 'false';
      },
    ) => Promise<PlanCheckout>;

    /**
     * Retrieve the list of features for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * @returns {Promise<PlanFeature[]>}
     */
    getFeatures: (planUuid: string) => Promise<PlanFeature[]>;

    /**
     * Retrieve the list of capabilities for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * @returns {Promise<PlanCapability[]>}
     */
    getCapabilities: (planUuid: string) => Promise<PlanCapability[]>;

    /**
     * Retrieve the list of currencies for a specific plan
     *
     * @param  {string} planUuid The UUID of the plan
     *
     * @returns {Promise<PlanCurrency[]>}
     */
    getCurrencies: (planUuid: string) => Promise<PlanCurrency[]>;
  };
};

export type PlanVersionedMethods<V extends TVersion> = V extends keyof PlanVersions
  ? PlanVersions[V]
  : never;

export const PlansInit = <V extends TVersion>(
  version: V,
  request: ApiRequest,
): PlanVersionedMethods<V> => {
  switch (version) {
    case Version.V2:
      return v2PlanMethods(request) as PlanVersionedMethods<V>;
    default:
      throw new Error('Unsupported version');
  }
};

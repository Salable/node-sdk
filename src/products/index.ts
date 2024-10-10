import { ApiRequest, TVersion, Version } from ".."
import {
  Plan,
  Product,
  ProductCapability,
  ProductCurrency,
  ProductPricingTable,
} from '../types';
import { v2ProductMethods } from "./v2";


export type ProductVersions = {
  [Version.V2]: {
    /**
     *  Retrieves a list of all products
     *
     * @returns {Promise<Product[]>} All products present on the account
     */
    getAll: () => Promise<Product[]>;

    /**
     *  Retrieves a specific product by its UUID. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *  @param {string} productUuid - The UUID of the product
     *  @param {{ expand: string[] }} options
     *  @param {{ expand: string[] }} options.expand - Additional properties to expand the product's relations as comma separated values eg `expand: ["plans","features"]`
     *
     * @returns {Promise<Product>}
     */
    getOne: (productUuid: string, options?: { expand: string[] }) => Promise<Product>;

    /**
     *  Retrieves all the plans associated with a specific product. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the expand query parameter.
     *  @param {string} productUuid - The UUID of the product
     *  @param {{ granteeId?: string; currency?: string;}} options
     *  @param {{ granteeId?: string; currency?: string;}} options.granteeId - The unique identifier for the grantee
     *  @param {{ granteeId?: string; currency?: string;}} options.currency - Uses the currency short name e.g. USD, defaults to the default currency on the Product which the Plan is linked to.
     *
     * @returns {Promise<ProductPricingTable>}
     */
    getPricingTable: (
      productUuid: string,
      options?: { granteeId?: string; currency?: string },
    ) => Promise<ProductPricingTable>;

    /**
     * Retrieves all the plans associated with a specific product. By default, the response does not contain any relational data. If you want to expand the relational data, you can do so with the `expand` query parameter.
     *
     * @param  {string} productUuid The uuid of the product
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
     * @returns {Promise<IPlan[]>} An array of all the associated plans
     */
    getPlans(
      productUuid: string,
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
    ): Promise<Plan[]>;

    /**
     * Retrieve the list of features for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<Product>} An array of all the associated features
     */
    getFeatures(productUuid: string): Promise<Product>;

    /**
     * Retrieve the list of capabilities for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<ProductCapability[]>}
     */
    getCapabilities(productUuid: string): Promise<ProductCapability[]>;

    /**
     * Retrieve the list of currencies for a product
     *
     * @param  {string} productUuid The uuid of the product
     *
     * @returns {Promise<ProductCurrency[]>}
     */
    getCurrencies(productUuid: string): Promise<ProductCurrency[]>;
  };
};

export type ProductVersionedMethods<V extends TVersion> = V extends keyof ProductVersions ? ProductVersions[V] : never;

export const ProductsInit = <V extends TVersion>(version: V, request: ApiRequest): ProductVersionedMethods<V> => {
    switch (version) {
        case Version.V2:
            return v2ProductMethods(request) as ProductVersionedMethods<V>;
        default:
            throw new Error("Unsupported version")
    }
}
type NonBodyRequest = {
  method: 'GET' | 'HEAD';
  body?: never;
};

type BodyRequest<T = void> = {
  method: 'POST' | 'PUT' | 'DELETE';
  body?: T;
};

export type IRequestBase<T> = Omit<RequestInit, 'body'> & (NonBodyRequest | BodyRequest<T>);

export type Status = 'ACTIVE' | 'CANCELED';
export type LicenseStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'EVALUATION'
  | 'SCHEDULED'
  | 'TRIALING'
  | 'INACTIVE';
export type ProductStatus = 'ACTIVE' | 'DEPRECATED';
export type SearchParamOptions = Record<string, string | string[] | number | boolean>;

export interface CreateAdhocLicenseInput {
  planUuid: string;
  member: string;
  granteeId?: string;
  status?: 'ACTIVE' | 'TRIALING';
  endTime?: Date;
}

export interface GetLicenseOptions {
  status?: LicenseStatus;
  cursor?: string;
  take?: string;
  subscriptionUuid?: string;
}

export interface GetPurchasersLicensesInput {
  purchaser: string;
  productUuid: string;
  options?: LicenseGetByPurchaserOptions;
}

export interface CheckLicenseInput {
  productUuid: string;
  granteeIds: string[];
  grace?: number;
}

export interface GetLicenseCountInput {
  subscriptionUuid: string;
  status: LicenseStatus;
}

export interface UpdateLicenseInput {
  granteeId: string;
}

export interface UpdateManyLicenseInput {
  granteeId: string;
  uuid: string;
}

export interface GetLicenseCountResponse {
  count: number;
  assigned: number;
  unassigned: number;
}

export interface License {
  uuid: string;
  name: string;
  email: string;
  status: string;
  granteeId: string;
  paymentService: string;
  purchaser: string;
  type: string;
  productUuid: string;
  planUuid: string;
  capabilities: Capability[];
  metadata: IMetadata | null;
  startTime: string;
  endTime: string;
  updatedAt: string;
  isTest: boolean;
}

export interface GetAllLicensesResponse {
  first: string;
  last: string;
  data: License[];
}

export type Proration = 'create_prorations' | 'none' | 'always_invoice';

export type SubscriptionsChangePlan = {
  planUuid: string;
  proration: Proration;
};

// PRODUCT
export interface Product {
  uuid: string;
  name: string;
  description?: string;
  logoUrl?: string;
  displayName: string;
  organisation: string;
  status: ProductStatus;
  paid: boolean;
  paymentIntegrationProductId: string | null;
  organisationPaymentIntegrationUuid: string;
  appType: string;
  updatedAt: string;
  isTest: boolean;
}
export interface Feature {
  uuid: string;
  name: string;
  description?: string;
  displayName: string;
  variableName?: string;
  status: ProductStatus;
  visibility: string;
  valueType: string;
  defaultValue: string;
  showUnlimited: boolean;
  productUuid: string;
  updatedAt: string;
  sortOrder: number;
}
export interface featureEnumOption {
  uuid: string;
  name: string;
  featureUuid: string;
  updatedAt: string;
}
export interface ProductCurrency {
  productUuid: string;
  currencyUuid: string;
  defaultCurrency: boolean;
  currency: Currency;
}
export interface Currency {
  uuid: string;
  shortName: string;
  longName: string;
  symbol: string;
}

export interface Capability {
  uuid: string;
  name: string;
  description: string | null;
  status: ProductStatus;
  productUuid: string;
  updatedAt: string;
}

export interface Grantee {
  isLicensed: boolean;
  isSubscribed: boolean;
}
export interface ProductPricingTable extends Product {
  features: Feature[];
  currencies: ProductCurrency[];
  plans: Plan & { grantee: Grantee; currencies: Currency[]; features: Feature[] }[];
}

export interface ProductCapability {
  uuid: string;
  name: string;
  description?: string;
  status: string;
  productUuid: string;
  updatedAt: string;
}

/**
 * PLAN TYPES
 */
export type PlanStatus =
  | 'ACTIVE'
  | 'DEPRECATED'
  | 'DRAFT'
  | 'REVISION'
  | 'SCHEDULED'
  | 'COMING_SOON';
export interface Plan {
  uuid: string;
  /**
   * Deprecated
   */
  name: string;
  description?: string;
  displayName: string;
  status: PlanStatus;
  isTest: boolean;
  trialDays: number | null;
  evaluation: boolean;
  evalDays: number;
  organisation: string;
  visibility: string;
  licenseType: string;
  perSeatAmount: number;
  interval: string;
  length: number;
  active: boolean;
  planType: string;
  pricingType: string;
  environment: string;
  /**
   * Deprecated
   */
  paddlePlanId?: string;
  productUuid: string;
  salablePlan: boolean;
  updatedAt: string;
}

export interface PlanFeatureEnumValue {
  uuid: string;
  name: string;
  featureUuid: string;
  updatedAt: string;
}
export interface PlanFeature {
  planUuid: string;
  featureUuid: string;
  value: string;
  enumValueUuid: string | null;
  isUnlimited: boolean;
  isUsage: boolean;
  pricePerUnit: number | null;
  minUsage: number | null;
  maxUsage: number | null;
  updatedAt: string;
  feature: Feature;
  enumValue: PlanFeatureEnumValue;
}

export interface PlanCurrency {
  planUuid: string;
  currencyUuid: string;
  price: number;
  paymentIntegrationPlanId: string;
  currency: Currency;
}

export interface PlanCheckout {
  checkoutUrl: string;
}

export interface PlanCapability {
  planUuid: string;
  capabilityUuid: string;
  updatedAt: string;
  capability: Capability;
}

// PRICING TABLE

export interface PricingTableResponse {
  uuid: string;
  name: string;
  status: ProductStatus;
  title: string | null;
  text: string | null;
  theme: 'light' | 'dark' | string;
  featureOrder: string;
  productUuid: string;
  customTheme: string | string;
  featuredPlanUuid: string | string;
  updatedAt: string;
  features: PricingTableFeature[];
  product: Product & { features: Feature[]; currencies: ProductCurrency[] };
  plans: PricingTablePlan[];
}

interface PricingTableFeature {
  pricingTableUuid: string;
  featureUuid: string;
  sortOrder: number;
  updatedAt: string;
  feature: Feature & {
    featureEnumOptions: featureEnumOption[];
  };
}

interface PricingTablePlan {
  planUuid: string;
  pricingTableUuid: string;
  sortOrder: number;
  updatedAt: string;
  plan: Plan & {
    features: Feature & { featureEnumOptions: featureEnumOption[] }[];
    currencies: PlanCurrency[];
  };
}

/**
 * SUBSCRIPTION
 */

export type AllSubscription = {
  first: string;
  last: string;
  hasMore: boolean;
  data: Subscription[];
};

export type SubscriptionType = 'salable' | 'stripe_existing';
export type SubscriptionStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'PAUSED'
  | 'TRIALING'
  | 'DELETED'
  | 'PAST_DUE'
  | 'INCOMPLETE_EXPIRED'
  | 'INCOMPLETE'
  | 'UNPAID';
export interface Subscription {
  uuid: string;
  productUuid: string;
  planUuid: string;
  organisation: string;
  paymentIntegrationSubscriptionId: string;
  type: SubscriptionType;
  quantity: number;
  email: string | null;
  expiryDate: string;
  lineItemIds: string[] | null;
  status: SubscriptionStatus;
  createdAt: string;
  updatedAt: string;
  isTest: boolean;
}

export type SubscriptionInvoice = {
  first: string;
  last: string;
  hasMore: boolean;
  data: Invoice[];
};

export interface Invoice {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids: string | null;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  amount_shipping: number;
  application: string;
  application_fee_amount: string | null;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: {
    enabled: boolean;
    status: string | null;
  };
  billing_reason: string;
  charge: string | null;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: string | null;
  customer: string;
  customer_address: {
    city: string | null;
    country: string;
    line1: string | null;
    line2: string | null;
    postal_code: string;
    state: string | null;
  };
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  customer_shipping: string | null;
  customer_tax_exempt: string;
  customer_tax_ids: string[] | null;
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: string[] | null;
  description: string | null;
  discount: string | null;
  discounts: string[] | null;
  due_date: string | null;
  effective_at: number;
  ending_balance: number;
  footer: string | null;
  from_invoice: string | null;
  hosted_invoice_url: string;
  invoice_pdf: string;
  last_finalization_error: string | null;
  latest_revision: string | null;
  lines: {
    object: string;
    data: LineItem[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  livemode: boolean;
  metadata: Record<string, unknown>;
  next_payment_attempt: string | null;
  number: string;
  on_behalf_of: string | null;
  paid: boolean;
  paid_out_of_band: boolean;
  payment_intent: string | null;
  payment_settings: {
    default_mandate: string | null;
    payment_method_options: {
      acss_debit: string;
      bancontact: string;
      card: {
        request_three_d_secure: string;
      };
      customer_balance: string;
      konbini: string;
      sepa_debit: string;
      us_bank_account: string;
    } | null;
    payment_method_types: string | null;
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: string | null;
  receipt_number: string | null;
  rendering: string | null;
  rendering_options: string | null;
  shipping_cost: string | null;
  shipping_details: string | null;
  starting_balance: number;
  statement_descriptor: string | null;
  status: string;
  status_transitions: {
    finalized_at: number;
    marked_uncollectible_at: string | null;
    paid_at: number;
    voided_at: string | null;
  };
  subscription: string;
  subscription_details: {
    metadata: {
      granteeId: string;
      member: string;
    };
  };
  subtotal: number;
  subtotal_excluding_tax: number;
  tax: string | null;
  test_clock: string | null;
  total: number;
  total_discount_amounts: string[] | null;
  total_excluding_tax: number;
  total_tax_amounts: string[] | null;
  transfer_data: string | null;
  webhooks_delivered_at: number;
}

interface LineItem {
  id: string;
  object: string;
  amount: number;
  amount_excluding_tax: number;
  currency: string;
  description: string;
  discount_amounts: string[] | null;
  discountable: boolean;
  discounts: string[] | null;
  invoice_item: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  period: {
    end: number;
    start: number;
  };
  plan: {
    id: string;
    object: string;
    active: boolean;
    aggregate_usage: string | null;
    amount: number;
    amount_decimal: string;
    billing_scheme: string;
    created: number;
    currency: string;
    interval: string;
    interval_count: number;
    livemode: boolean;
    metadata: Record<string, unknown>;
    nickname: string;
    product: string;
    tiers_mode: string | null;
    transform_usage: string | null;
    trial_period_days: string | null;
    usage_type: string;
  };
  price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: string | null;
    livemode: boolean;
    lookup_key: string | null;
    metadata: Record<string, unknown>;
    nickname: string;
    product: string;
    recurring: {
      aggregate_usage: string | null;
      interval: string;
      interval_count: number;
      trial_period_days: string | null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: string | null;
    transform_quantity: string | null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  proration: boolean;
  proration_details: {
    credited_items: {
      invoice: string;
      invoice_line_items: string[];
    } | null;
  };
  quantity: number;
  subscription: string;
  subscription_item: string;
  tax_amounts: string[] | null;
  tax_rates: string[] | null;
  type: string;
  unit_amount_excluding_tax: string;
}

// END

export interface CheckLicensesCapabilitiesResponse {
  capabilities: {
    capability: string;
    expiry: string;
  }[];
  signature: string;
}

export interface ICapabilitiesEndDates {
  [key: string]: string;
}

export interface IMetadata {
  [key: string]: string;
}

export interface IUsageUpdateCountOptions {
  increment: number;
}

export interface IUsageUpdateInput {
  licenseUuid: string;
  featureVariableName: string;
  countOptions: IUsageUpdateCountOptions;
}

export type LicenseCancelManyBody = {
  uuids: string[];
};

export type LicenseGetByPurchaserOptions = {
  status?: Status;
};

export type LicenseGetUsage = {
  licenseUuid: string;
  featureUuid: string;
  planUuid: string;
  unitCount: number;
};

export interface IPermission {
  uuid: string;
  value: string;
  type: string | null;
  description: string | null;
  dependencies: { [k: string]: string } | null;
  organisation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INestedPermission {
  uuid: string;
  value: string;
  type: string | null;
}

export interface IRole {
  uuid: string;
  name: string;
  description: string | null;
  organisation: string;
  permissions?: INestedPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INestedRole {
  uuid: string;
  name?: string;
  description?: string;
  permissions?: INestedPermission[];
  createdAt: Date;
}

export interface IRbacUser {
  id: string;
  name: string | null;
  organisation: string;
  role?: INestedRole;
  permissions?: INestedPermission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatePermissionInput {
  value: string;
  type?: string | null;
  description?: string | null;
  dependencies?: { [k: string]: string } | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  rbacUsers?: string[];
  roles?: string[];
}

export interface IUpdatePermissionInput {
  value?: string;
  type?: string;
  description?: string;
  dependencies?: string[];
}

export interface ICreateRoleInput {
  name: string;
  description: string;
  permissions: string[];
}

export interface IUpdateRoleInput {
  name?: string;
  description?: string;
  permissions: { add?: string[]; remove?: string[] };
}

export interface ICreateRbacUserInput {
  id: string;
  name?: string;
  role?: string;
  permissions?: string[];
}

export interface IUpdateRbacUserInput {
  id?: string;
  name?: string;
  role?: string;
  permissions: { add?: string[]; remove?: string[] };
}

export type SubscriptionPlan = {
  uuid: string;
  name: string;
  description: string;
  displayName: string;
  status: 'ACTIVE' | string;
  isTest: boolean;
  trialDays: number;
  evaluation: boolean;
  evalDays: number;
  organisation: string;
  visibility: string;
  licenseType: string;
  perSeatAmount: number;
  interval: string;
  length: number;
  active: boolean;
  planType: string;
  pricingType: string;
  environment: string;
  paddlePlanId: string;
  productUuid: string;
  salablePlan: boolean;
  updatedAt: string;
  currencies: Currency[];
  features: Feature[];
};

export type SubscriptionPaymentLink = {
  url: string;
};

export type SubscriptionPaymentMethod = {
  id: string;
  object: string;
  billing_details: BillingDetails;
  card: Card;
  created: number;
  customer: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  type: string;
};

type BillingDetails = {
  address: Address;
  email: string;
  name: string;
  phone: string;
};

type Address = {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
};

type Card = {
  brand: string;
  checks: {
    address_line1_check: string;
    address_postal_code_check: string;
    cvc_check: string;
  };
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: string;
  last4: string;
  networks: {
    available: string[];
    preferred: string;
  };
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: string;
};

export type SubscriptionSeatResponse = {
  eventUuid: string;
};

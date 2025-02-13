import { EventStatus } from '@prisma/client';

export const Version = {
  V2: 'v2',
} as const;
export type TVersion = (typeof Version)[keyof typeof Version];
export type ApiFetch = (apiKey: string, version: string) => ApiRequest;
export type ApiRequest = <T>(input: string | URL | Request, init: RequestInit | undefined) => Promise<T>;

export type Status = 'ACTIVE' | 'CANCELED';
export type ProductStatus = 'ACTIVE' | 'DEPRECATED';
export type LicenseStatus = 'ACTIVE' | 'CANCELED' | 'EVALUATION' | 'SCHEDULED' | 'TRIALING' | 'INACTIVE';
export type SortOrder = 'asc' | 'desc'
export type SearchParamOptions = Record<string, string | string[] | number | boolean>;

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PAUSED' | 'TRIALING' | 'DELETED' | 'PAST_DUE' | 'INCOMPLETE';

export type CreateAdhocLicenseInput = {
  planUuid: string;
  member: string;
  granteeId: string | null;
  status?: 'ACTIVE' | 'TRIALING';
  endTime?: string;
  cancelAtPeriodEnd?: boolean;
};

export type GetLicenseOptions = {
  status?: LicenseStatus;
  cursor?: string;
  take?: number;
  subscriptionUuid?: string;
  granteeId?: string;
  planUuid?: string;
  productUuid?: string;
};

export type GetPurchasersLicensesOptions = {
  purchaser: string;
  productUuid: string;
  status?: LicenseStatus; // Todo: define status types
};

export type GetGranteeIdLicensesInput = { expand: string[] };

export type CheckLicenseInput = {
  productUuid: string;
  granteeIds: string[];
  grace?: number;
};

export type GetLicenseCountOptions = {
  subscriptionUuid?: string;
  status?: LicenseStatus;
};

export type UpdateLicenseInput = {
  granteeId: string;
};

export type UpdateManyLicenseInput = {
  granteeId: string;
  uuid: string;
};

export type GetLicenseCountResponse = {
  count: number;
  assigned: number;
  unassigned: number;
};

export type GetUsageOptions = {
  granteeId: string
  type?: string;
  status?: string;
  planUuid?: string;
  subscriptionUuid?: string;
  sort?: SortOrder;
  cursor?: string;
  take?: number;
};

export type PaginatedUsageRecords = {
  first: string;
  last: string;
  data: UsageRecord[];
};

export type UsageRecord = {
  uuid: string;
  unitCount: number;
  type: string;
  recordedAt: string;
  resetAt: string;
  planUuid: string;
  licenseUuid: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUsageOptions = {
  granteeId: string;
  planUuid: string
}

export type CurrentUsageRecord = {
  unitCount: number;
  updatedAt: string
}

export type UpdateLicenseUsageOptions = {
  granteeId: string,
  planUuid: string,
  increment: number,
  idempotencyKey: string
}

export type License = {
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
  subscriptionUuid: string | null;
  isTest: boolean;
  cancelAtPeriodEnd: boolean;
};

export type PaginatedLicenses = {
  first: string;
  last: string;
  data: License[];
};

export type Subscription = {
  uuid: string;
  paymentIntegrationSubscriptionId: string;
  productUuid: string;
  type: string;
  email: string;
  owner: string | null;
  quantity: number;
  lineItemIds: string[] | null;
  organisation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  planUuid: string;
  isTest: boolean;
  cancelAtPeriodEnd: boolean;
};

export type GetAllSubscriptionsOptions = {
  status?: SubscriptionStatus;
  email?: string;
  cursor?: string;
  take?: number;
  expand?: string[],
  sort?: SortOrder,
  productUuid?: string,
  planUuid?: string
}

export type PaginatedSubscription = {
  first: string;
  last: string;
  data: Subscription[];
};

export type Proration = 'create_prorations' | 'none' | 'always_invoice';

export type SubscriptionsChangePlan = {
  planUuid: string;
  proration: Proration;
};

export type Plan = {
  uuid: string;
  name: string;
  slug: string;
  description?: string;
  perSeatAmount: number;
  maxSeatAmount: null;
  displayName: string;
  hasAcceptedTransaction: boolean;
  status: string;
  trialDays: null;
  evaluation: false;
  evalDays: number;
  organisation: string;
  visibility: string;
  licenseType: string;
  interval: string;
  length: number;
  active: boolean;
  planType: string;
  pricingType: string;
  environment: string;
  type?: string;
  paddlePlanId?: string;
  productUuid: string;
  salablePlan: boolean;
  updatedAt: string;
  isTest: boolean;
  features: Feature;
  currencies?: Currency;
};

export type IFeature = {
  uuid: string;
  name: string;
  description?: string;
  displayName: string;
  variableName?: string;
  status: string;
  visibility: string;
  valueType: string;
  defaultValue: string;
  showUnlimited: boolean;
  productUuid?: string;
  updatedAt: string;
};

export type FeatureEnumOption = {
  uuid: string;
  name: string;
  featureUuid: string;
  updatedAt: string;
};

export type ICheckoutDefaultParams = {
  member: string;
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
  customMessage?: string;
  currency?: SupportedCurrencies;
};

export type ICheckoutCustomerParams = {
  customerEmail?: string;
  customerCountry?: string;
  customerPostcode?: string;
};

export type ICheckoutVatParams = {
  vatNumber?: string;
  vatCompanyName?: string;
  vatStreet?: string;
  vatCity?: string;
  vatState?: string;
  vatCountry?: string;
  vatPostcode?: string;
};

export type PricingTable = {
  uuid: string;
  name: string;
  status: ProductStatus;
  title: string | null;
  text: string | null;
  theme: 'light' | 'dark' | string;
  featureOrder: string;
  productUuid: string;
  customTheme: string;
  featuredPlanUuid: string;
  updatedAt: string;
  features: PricingTableFeature[];
  product: Product & { features: Feature[]; currencies: ProductCurrency[] };
  plans: PricingTablePlan[];
};

export interface IPlanCheckoutParams extends ICheckoutDefaultParams, ICheckoutCustomerParams, ICheckoutVatParams {
  successUrl: string;
  cancelUrl: string;
  contactUsLink?: string;
  granteeId: string;
  quantity?: number;
}

export interface IPricingTableParams extends ICheckoutDefaultParams, ICheckoutCustomerParams, ICheckoutVatParams {
  globalSuccessUrl: string;
  globalCancelUrl: string;
  globalGranteeId: string;
  contactUsLink?: string;
}

export type PlanCheckoutKey = keyof IPlanCheckoutParams;
export type PricingTableCheckoutKey = keyof IPricingTableParams;
export type SupportedCurrencies = 'USD' | 'EUR' | 'GBP';

export type IDefaultCheckoutInputParams = {
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
  customMessage?: string;
  currency?: SupportedCurrencies;
  customer?: {
    email?: string;
    country?: string;
    postcode?: string;
  };
  vat?: {
    number?: string;
    companyName?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
};

export type PlanCheckout = {
  checkoutUrl: string;
};

export type GetPlanOptions = {
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
};

export type GetPlanCheckoutOptions = {
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
  requirePaymentMethod?: boolean;
};

export type PlanFeature = {
  planUuid: string;
  featureUuid: string;
  value: string;
  enumValueUuid?: string;
  isUnlimited: boolean;
  isUsage: boolean;
  maxUsage: boolean;
  minUsage: boolean;
  pricePerUnit: number;
  updatedAt: string;
  feature: IFeature;
  enumValue: string | null;
};

export type PlanCapability = {
  planUuid: string;
  capabilityUuid: string;
  updatedAt: string;
  capability: Capability;
};

export type PlanCurrency = {
  planUuid: string;
  currencyUuid: string;
  price: number;
  hasAcceptedTransaction: boolean;
  paymentIntegrationPlanId: string;
  currency: ICurrency;
};

export type ICurrency = {
  uuid: string;
  shortName: string;
  longName: string;
  symbol: string;
};

export type Capability = {
  uuid: string;
  name: string;
  status: string;
  updatedAt: string;
  description?: string;
  productUuid: string;
};

export type Product = {
  uuid: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  displayName: string;
  organisation: string;
  status: string;
  paid: boolean;
  organisationPaymentIntegrationUuid: string;
  paymentIntegrationProductId?: string;
  updatedAt: string;
  appType: string;
  isTest: boolean;
};

export type ProductCapability = {
  uuid: string;
  name: string;
  description?: string;
  status: string;
  productUuid: string;
  updatedAt: string;
};

export type ProductFeature = {
  defaultValue: string;
  description: string;
  displayName: string;
  featureEnumOptions: FeatureEnumOption | [];
  name: string;
  productUuid: string;
  showUnlimited: boolean;
  sortOrder: number;
  status: string;
  updatedAt: string;
  uuid: string;
  valueType: string;
  variableName: string;
  visibility: string;
};

export type ProductCurrency = {
  productUuid: string;
  currencyUuid: string;
  defaultCurrency: boolean;
  currency: ICurrency;
};

export type PricingTableFeature = {
  pricingTableUuid: string;
  featureUuid: string;
  sortOrder: number;
  updatedAt: string;
  feature: Feature & {
    featureEnumOptions: FeatureEnumOption[]; // Todo: fix type
  };
};

export type PricingTablePlan = {
  planUuid: string;
  pricingTableUuid: string;
  sortOrder: number;
  updatedAt: string;
  plan: Plan & {
    features: Feature & { featureEnumOptions: FeatureEnumOption[] }[];
    currencies: PlanCurrency[];
  };
};

export type PricingTableParameters = {
  globalPlanOptions: {
    granteeId: string;
    successUrl: string;
    cancelUrl: string;
    member: string;
    contactUsLink: string;
    marketingConsent?: string;
    couponCode?: string;
    promoCode?: string;
    allowPromoCode?: string;
    currency?: SupportedCurrencies;
    customer?: {
      email?: string;
      country?: string;
      postcode?: string;
    };
    vat?: {
      number?: string;
      companyName?: string;
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      postcode?: string;
    };
    customMessage?: string;
  };
  individualPlanOptions?: {
    [key: string]: {
      granteeId?: string;
      successUrl?: string;
      cancelUrl?: string;
    };
  };
};

export type IOrganisationPaymentIntegration = {
  uuid: string;
  organisation: string;
  integrationName: string;
  accountName: string;
  accountData: {
    key: string;
    encryptedData: string;
  };
  accountId: string;
  updatedAt: string;
  isTest: boolean;
};

export type ProductPricingTable = {
  features: IFeature[];
  currencies: ICurrency[];
  plans: (Plan & { features: IFeature[]; currencies: ICurrency[]; checkoutUrl: string })[];
} & Product;

export type CheckLicensesCapabilitiesResponse = {
  capabilities: {
    capability: string;
    expiry: string;
  }[];
  signature: string;
};

export type CapabilitiesEndDates = {
  [key: string]: string;
};

export type IMetadata = {
  [key: string]: string;
};

export type IUsageUpdateCountOptions = {
  increment: number;
};

export type IUsageUpdateInput = {
  licenseUuid: string;
  featureVariableName: string;
  countOptions: IUsageUpdateCountOptions;
};

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

export type GetAllInvoicesOptions = {
  cursor?: string;
  take?: number;
}

export type PaginatedSubscriptionInvoice = {
  first: string;
  last: string;
  hasMore: boolean;
  data: Invoice[];
};

export type Invoice = {
  id: string;
  object: string;
  account_country: string;
  account_name: string;
  account_tax_ids: string;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  amount_shipping: number;
  application: string;
  application_fee_amount: string;
  attempt_count: number;
  attempted: boolean;
  auto_advance: boolean;
  automatic_tax: {
    enabled: boolean;
    status: string | null;
    disabled_reason: null | string;
    liability: null | null;
  };
  issuer: Record<string, unknown>;
  automatically_finalizes_at: number | null;
  billing_reason: string;
  charge: string;
  collection_method: string;
  created: number;
  currency: string;
  custom_fields: string;
  customer: string;
  customer_address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  customer_shipping: string;
  customer_tax_exempt: string;
  customer_tax_ids: string[];
  default_payment_method: string;
  default_source: string;
  default_tax_rates: string[];
  description: string;
  discount: string;
  discounts: string[];
  due_date: string;
  effective_at: number;
  ending_balance: number;
  footer: string;
  from_invoice: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  last_finalization_error: string;
  latest_revision: string;
  lines: {
    object: string;
    data: LineItem[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  livemode: boolean;
  metadata: Record<string, unknown>;
  next_payment_attempt: string;
  number: string;
  on_behalf_of: string;
  paid: boolean;
  paid_out_of_band: boolean;
  payment_intent: string;
  payment_settings: {
    default_mandate: string;
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
    };
    payment_method_types: string;
  };
  period_end: number;
  period_start: number;
  post_payment_credit_notes_amount: number;
  pre_payment_credit_notes_amount: number;
  quote: string;
  receipt_number: string;
  rendering: string;
  rendering_options: string;
  shipping_cost: string;
  shipping_details: string;
  starting_balance: number;
  statement_descriptor: string;
  status: string;
  status_transitions: {
    finalized_at: number;
    marked_uncollectible_at: string;
    paid_at: number;
    voided_at: string;
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
  tax: string;
  test_clock: string;
  total: number;
  total_discount_amounts: string[];
  total_excluding_tax: number;
  total_pretax_credit_amounts: object | null;
  total_tax_amounts: string[];
  transfer_data: string;
  webhooks_delivered_at: number | null;
};

type LineItem = {
  id: string;
  object: string;
  amount: number;
  amount_excluding_tax: number;
  currency: string;
  description: string;
  discount_amounts: string[];
  discountable: boolean;
  discounts: string[];
  invoice_item: string;
  livemode: boolean;
  metadata: Record<string, unknown>;
  period: {
    end: number;
    start: number;
  }[];
  plan: Record<string, unknown>;
  price: {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: string;
    livemode: boolean;
    lookup_key: string;
    metadata: Record<string, unknown>;
    nickname: string;
    product: string;
    recurring: {
      aggregate_usage: string;
      interval: string;
      interval_count: number;
      trial_period_days: string;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: string;
    transform_quantity: string;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  proration: boolean;
  proration_details: {
    credited_items: {
      invoice: string;
      invoice_line_items: string[];
    };
  };
  quantity: number;
  subscription: string;
  subscription_item: string;
  tax_amounts: string[];
  tax_rates: string[];
  type: string;
  unit_amount_excluding_tax: string;
  webhooks_delivered_at: number;
};

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

type Currency = {
  planUuid: string;
  currencyUuid: string;
  price: number;
  paymentIntegrationPlanId: string;
  currency: {
    uuid: string;
    shortName: string;
    longName: string;
    symbol: string;
  };
};

type Feature = {
  planUuid: string;
  featureUuid: string;
  value: string;
  enumValueUuid: string;
  isUnlimited: boolean;
  isUsage: boolean;
  pricePerUnit: number;
  minUsage: number;
  maxUsage: number;
  updatedAt: string;
  feature: {
    uuid: string;
    name: string;
    description: string;
    displayName: string;
    variableName: string;
    status: 'ACTIVE' | string;
    visibility: string;
    valueType: string;
    defaultValue: string;
    showUnlimited: boolean;
    productUuid: string;
    updatedAt: string;
    sortOrder: number;
  };
  enumValue: {
    uuid: string;
    name: string;
    featureUuid: string;
    updatedAt: string;
  };
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

export type SubscriptionSeat = {
  eventUuid: string;
};

export enum EventTypeEnum {
  CreateSeats = 'Create seats',
  RemoveSeats = 'Remove seats',
  ChangePlan = 'Change plan',
  UpdateUsage = 'Update usage',
  CancelSubscription = 'Cancel subscription',
}

export type Event = {
  uuid: string;
  type: EventTypeEnum;
  organisation: string;
  status: EventStatus;
  isTest: boolean;
  retries: number;
  errorMessage: string;
  errorCode: string;
  createdAt: string;
  updatedAt: string;
};

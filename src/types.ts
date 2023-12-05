type INonBodyRequest = {
  method: 'GET' | 'HEAD';
  body?: never;
};

type IBodyRequest<T = void> = {
  method: 'POST' | 'PUT' | 'DELETE';
  body?: T;
};

export function isRequestWithBody<T>(request: IRequestBase<T>): request is IBodyRequest<T> {
  return (request as IBodyRequest).body !== undefined;
}

export type IRequestBase<T> = Omit<RequestInit, 'body'> & (INonBodyRequest | IBodyRequest<T>);

export type Status = 'ACTIVE' | 'CANCELED';
export interface ICreateAdhocLicenseInput {
  planUuid: string;
  member: string;
  granteeId: string;
}

export interface IUpdateLicenseInput {
  granteeId: string;
}

export interface IUpdateManyLicenseInput {
  granteeId: string;
  uuid: string;
}

export interface ILicenseCountResponse {
  count: number;
  assigned: number;
  unassigned: number;
}

export interface ILicense {
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
  capabilities: ICapability[];
  metadata: IMetadata | null;
  startTime: string;
  endTime: string;
  updatedAt: string;
  flags: Flags | null;
  isTest: boolean;
}

export type Flags = Record<string, boolean | string | number>;

export interface ISubscription {
  uuid: string;
  paymentIntegrationSubscriptionId: string;
  productUuid: string;
  type: string;
  email: string;
  organisation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiryDate: string;
  licenseUuid: string;
  planUuid: string;
  isTest: boolean;
}

export type Proration = 'create_prorations' | 'none' | 'always_invoice';

export type SubscriptionsChangePlanBody = {
  planUuid: string;
  proration?: Proration;
};

export interface IPlan {
  uuid: string;
  name: string;
  description?: string;
  displayName: string;
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
  type: string;
  paddlePlanId?: string;
  productUuid: string;
  salablePlan: boolean;
  updatedAt: string;
  isTest: boolean;
  flags: Flags | null;
}

export interface IFeature {
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
}

export interface ICheckoutDefaultParams {
  member: string;
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
  customMessage?: string;
}

export interface ICheckoutCustomerParams {
  customerEmail?: string;
  customerCountry?: string;
  customerPostcode?: string;
}

export interface ICheckoutVatParams {
  vatNumber?: string;
  vatCompanyName?: string;
  vatStreet?: string;
  vatCity?: string;
  vatState?: string;
  vatCountry?: string;
  vatPostcode?: string;
}

export interface IPlanCheckoutParams
  extends ICheckoutDefaultParams,
    ICheckoutCustomerParams,
    ICheckoutVatParams {
  successUrl: string;
  cancelUrl: string;
  contactUsLink?: string;
  granteeId: string;
}

export interface IPricingTableParams
  extends ICheckoutDefaultParams,
    ICheckoutCustomerParams,
    ICheckoutVatParams {
  globalSuccessUrl: string;
  globalCancelUrl: string;
  globalGranteeId: string;
  contactUsLink?: string;
}

export type PlanCheckoutKey = keyof IPlanCheckoutParams;
export type PricingTableCheckoutKey = keyof IPricingTableParams;

export interface IPlanCheckoutInputParams {
  successUrl: string;
  cancelUrl: string;
  contactUsLink?: string;
  granteeId: string;
  member: string;
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
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
}

export interface IDefaultCheckoutInputParams {
  marketingConsent?: string;
  couponCode?: string;
  promoCode?: string;
  allowPromoCode?: string;
  customMessage?: string;
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
}

export interface IPlanCheckoutResponse {
  checkoutUrl: string;
}

export interface IPlanFeatureResponse {
  planUuid: string;
  featureUuid: string;
  value: string;
  enumValueUuid?: string;
  isUnlimited: boolean;
  updatedAt: string;
  feature: IFeature;
  enumValue?: string;
  sortOrder: number;
}

export interface IPlanCapabilityResponse {
  planUuid: string;
  capabilityUuid: string;
  updatedAt: string;
  capability: ICapability;
}

export interface IPlanCurrencyResponse {
  planUuid: string;
  currencyUuid: string;
  price: number;
  paymentIntegrationPlanId: string;
  currency: ICurrency;
}

export interface ICurrency {
  uuid: string;
  shortName: string;
  longName: string;
  symbol: string;
}

export interface ICapability {
  uuid: string;
  name: string;
  status: string;
  updatedAt: string;
  description?: string;
  productUuid: string;
}

export interface IProduct {
  uuid: string;
  name: string;
  description: string | null;
  logoUrl?: string;
  displayName: string;
  organisation: string;
  status: string;
  paid: boolean;
  organisationPaymentIntegrationUuid: string;
  paymentIntegrationProductId?: string;
  updatedAt: string;
  isTest: boolean;
  // uuid: '37bd3de5-b2d6-4ce3-9327-7b5ca040edcb',
  // name: 'Paid Product 07-05 2.0',
  // description: '',
  // logoUrl: null,
  // displayName: 'Paid Product 07-05 2.0',
  // organisation: 'org_2V6lhX45FKEvAB2z8K3Mom0gyvH',
  // status: 'ACTIVE',
  // paid: true,
  // organisationPaymentIntegrationUuid: '9351d007-0a2b-4ca6-8fc6-f8b22f0974b7',
  // paymentIntegrationProductId: 'prod_OxkDQO1WgKy3MS',
  // appType: 'custom',
  // updatedAt: '2023-11-07T12:50:08.897Z',
  // isTest: false
}

export interface IProductCapabilityResponse {
  uuid: string;
  name: string;
  description?: string;
  status: string;
  productUuid: string;
  updatedAt: string;
}

export interface IProductCurrencyResponse {
  productUuid: string;
  currencyUuid: string;
  defaultCurrency: boolean;
  currency: ICurrency;
}

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

export interface IOrganisationPaymentIntegration {
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
}

export interface IProductPricingTableResponse extends IProduct {
  features: IFeature[];
  currencies: ICurrency[];
  organisationPaymentIntegration: IOrganisationPaymentIntegration;
  plans: (IPlan & { features: IFeature[]; currencies: ICurrency[]; checkoutUrl: string })[];
}

export interface ICheckLicensesCapabilities {
  capabilities: string[];
  publicHash: string;
  signature: string;
  capsHashed: string;
  capabilitiesEndDates: ICapabilitiesEndDates;
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

export interface ISubscriptionUpdatePlanInput {
  newPlanId: string;
  subscriptionId: string;
}

export interface ISubscriptionAddSeatsParams {
  increment: number;
}
export type ISubscriptionAddSeatsBody = ISubscriptionAddSeatsParams;

export interface ISubscriptionRemoveSeatsParams {
  decrement: number;
}

export type ISubscriptionRemoveSeatsBody = ISubscriptionRemoveSeatsParams;

export type CancelWhen = 'now' | 'end';

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
  cancelLink?: boolean;
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

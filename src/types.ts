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

export interface ICreateAdhocLicenseInput {
  planUuid: string;
  member: string;
  granteeId: string;
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
}

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
}

export interface ICapability {
  uuid: string;
  name: string;
  status: string;
  updatedAt: string;
  description: string;
  productUuid: string;
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

export type CancelWhen = 'now' | 'end';

export interface IUsageUpdateInput {
  licenseUuid: string;
  featureVariableName: string;
  countOptions: IUsageUpdateCountOptions;
}

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

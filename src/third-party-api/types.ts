export interface ICreateAdhocLicense {
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

export interface ICountOptions {
  increment: number;
}

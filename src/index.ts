import { ErrorCodes, ResponseError, SalableResponseError, SalableUnknownError, SalableValidationError, ValidationError } from './exceptions/salable-error';
import { licensesInit, LicenseVersionedMethods } from './licenses';
import { subscriptionsInit, SubscriptionVersionedMethods } from '../src/subscriptions';
import { plansInit, PlanVersionedMethods } from '../src/plans';
import { productsInit, ProductVersionedMethods } from '../src/products';
import { pricingTablesInit, PricingTableVersionedMethods } from '../src/pricing-tables';

export const Version = {
  V2: 'v2',
} as const;

export type TVersion = (typeof Version)[keyof typeof Version];
export type ApiFetch = (apiKey: string, version: string) => ApiRequest;
export type ApiRequest = <T>(input: string | URL | Request, init: RequestInit | undefined) => Promise<T>;

export const initRequest: ApiFetch =
  (apiKey, version) =>
  async <T>(input: string | URL | Request, init: RequestInit | undefined): Promise<T> => {
    let response;
    let data;
    try {
      response = await fetch(input, {
        ...init,
        headers: { 'Content-Type': 'application/json', ...init?.headers, 'x-api-key': apiKey, version },
      });
      if (response.headers.get('Content-Length') === '0') return undefined as T;
      data = (await response.json()) as T;
    } catch (error) {
      if (error instanceof TypeError) throw new Error('Unable to complete fetch operation');
      if (error instanceof SyntaxError) throw new Error('Unable to parse data');
      throw new SalableUnknownError();
    }

    if (response.ok) return data;

    switch (response.status) {
      case 400:
        throw new SalableValidationError(ErrorCodes.validation, response.status, data as ValidationError);
      case 401:
        throw new SalableResponseError(ErrorCodes.unauthenticated, response.status, data as ResponseError);
      case 403:
        throw new SalableResponseError(ErrorCodes.unauthorised, response.status, data as ResponseError);
      case 500:
        throw new SalableResponseError(ErrorCodes.unhandled, response.status, data as ResponseError);
      default:
        throw new SalableUnknownError();
    }
  };

export default class Salable<V extends TVersion> {
  products: ProductVersionedMethods<V>;
  plans: PlanVersionedMethods<V>;
  pricingTables: PricingTableVersionedMethods<V>;
  subscriptions: SubscriptionVersionedMethods<V>;
  licenses: LicenseVersionedMethods<V>;

  constructor(apiKey: string, version: V) {
    const request = initRequest(apiKey, version);

    this.products = productsInit(version, request);
    this.plans = plansInit(version, request);
    this.pricingTables = pricingTablesInit(version, request);
    this.subscriptions = subscriptionsInit(version, request);
    this.licenses = licensesInit(version, request);
  }
}

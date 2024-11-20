import { ErrorCodes, ResponseError, SalableParseError, SalableRequestError, SalableResponseError, SalableUnknownError, SalableValidationError, ValidationError } from './exceptions/salable-error';
import { licensesInit, LicenseVersionedMethods } from './licenses';
import { subscriptionsInit, SubscriptionVersionedMethods } from './subscriptions';
import { plansInit, PlanVersionedMethods } from './plans';
import { productsInit, ProductVersionedMethods } from './products';
import { pricingTablesInit, PricingTableVersionedMethods } from './pricing-tables';
import { ApiFetch, TVersion } from './types';

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
        if (error instanceof TypeError) throw new SalableRequestError();
        if (error instanceof SyntaxError) throw new SalableParseError();
        throw new SalableUnknownError();
      }

      if (response.ok) return data;

      switch (response.status) {
        case 400:
          throw new SalableValidationError(ErrorCodes.validation, data as ValidationError);
        case 401:
          throw new SalableResponseError(ErrorCodes.unauthenticated, data as ResponseError);
        case 403:
          throw new SalableResponseError(ErrorCodes.unauthorised, data as ResponseError);
        case 404:
          throw new SalableResponseError(ErrorCodes.notFound, data as ResponseError);
        case 500:
          throw new SalableResponseError(ErrorCodes.unhandled, data as ResponseError);
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

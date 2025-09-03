import { ErrorCodes, ResponseError, SalableParseError, SalableRequestError, SalableResponseError, SalableUnknownError, SalableValidationError, ValidationError } from './exceptions/salable-error';
import { LicenseVersionedMethods } from './licenses';
import { SubscriptionVersionedMethods } from './subscriptions';
import { PlanVersionedMethods } from './plans';
import { ProductVersionedMethods } from './products';
import { PricingTableVersionedMethods } from './pricing-tables';
import { UsageVersionedMethods } from './usage';
import { EventVersionedMethods } from './events';
import { SessionVersionedMethods } from './sessions';
import { v2EventMethods } from './events/v2';
import { v2LicenseMethods } from './licenses/v2';
import { v2PlanMethods } from './plans/v2';
import { v2PricingTableMethods } from './pricing-tables/v2';
import { v2ProductMethods } from './products/v2';
import { v2SessionMethods } from './sessions/v2';
import { v2SubscriptionMethods } from './subscriptions/v2';
import { v2UsageMethods } from './usage/v2';
import { v3PlanMethods } from './plans/v3';
import { v3PricingTableMethods } from './pricing-tables/v3';
import { v3ProductMethods } from './products/v3';
import { v3SubscriptionMethods } from './subscriptions/v3';
import { EntitlementVersionedMethods } from './entitlements';
import { v3EntitlementMethods } from './entitlements/v3';

export { ErrorCodes, SalableParseError, SalableRequestError, SalableResponseError, SalableUnknownError, SalableValidationError } from './exceptions/salable-error';
export type { ResponseError, ValidationError } from './exceptions/salable-error';

export const Version = {
  V2: 'v2',
  V3: 'v3',
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
      data = response.headers.get('Content-Length') === '0' ? undefined as T : (await response.json()) as T;
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


type MethodsV2 = {
  version: 'v2'
  licenses: LicenseVersionedMethods<'v2'>
  events: EventVersionedMethods<'v2'>
  subscriptions: SubscriptionVersionedMethods<'v2'>
  plans: PlanVersionedMethods<'v2'>
  pricingTables: PricingTableVersionedMethods<'v2'>
  products: ProductVersionedMethods<'v2'>
  sessions: SessionVersionedMethods<'v2'>
  usage: UsageVersionedMethods<'v2'>
}

type MethodsV3 = {
  version: 'v3'
  events: EventVersionedMethods<'v3'>
  subscriptions: SubscriptionVersionedMethods<'v3'>
  plans: PlanVersionedMethods<'v3'>
  pricingTables: PricingTableVersionedMethods<'v3'>
  products: ProductVersionedMethods<'v3'>
  sessions: SessionVersionedMethods<'v3'>
  usage: UsageVersionedMethods<'v3'>
  entitlements: EntitlementVersionedMethods<'v3'>
}

type VersionedMethodsReturn<V extends TVersion> =
  V extends 'v2' ? MethodsV2 :
  V extends 'v3' ? MethodsV3 :
  never;

function versionedMethods<V extends TVersion>(
  request: ApiRequest,
  version: V
): VersionedMethodsReturn<V> {
  switch (version) {
    case 'v2':
      return {
        version: 'v2',
        events: v2EventMethods(request),
        licenses: v2LicenseMethods(request),
        subscriptions: v2SubscriptionMethods(request),
        plans: v2PlanMethods(request),
        pricingTables: v2PricingTableMethods(request),
        products: v2ProductMethods(request),
        sessions: v2SessionMethods(request),
        usage: v2UsageMethods(request),
      } as VersionedMethodsReturn<V>;
    case 'v3':
      return {
        version: 'v3',
        events: v2EventMethods(request),
        subscriptions: v3SubscriptionMethods(request),
        plans: v3PlanMethods(request),
        pricingTables: v3PricingTableMethods(request),
        products: v3ProductMethods(request),
        sessions: v2SessionMethods(request),
        usage: v2UsageMethods(request),
        entitlements: v3EntitlementMethods(request)
      } as VersionedMethodsReturn<V>;
    default:
      throw new Error('Unknown version ' + version);
  }
}

export function initSalable<V extends TVersion>(apiKey: string, version: V) {
  const request = initRequest(apiKey, version);
  const versioned = versionedMethods(request, version);
  if (!versioned) throw new Error('Unknown Version ' + version);
  return versioned;
}
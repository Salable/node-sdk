import { ErrorCodes, ResponseError, SalableResponseError, SalableUnknownError, SalableValidationError, ValidationError } from './exceptions/salable-error';
import { licensesInit, LicenseVersionedMethods } from './licenses';

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
  licenses: LicenseVersionedMethods<V>;

  constructor(apiKey: string, version: V) {
    const request = initRequest(apiKey, version);

    this.licenses = licensesInit(version, request);
  }
}

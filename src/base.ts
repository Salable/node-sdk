import { SALABLE_BASE_URL } from './constants';
import 'isomorphic-fetch';
import { IRequestBase, isRequestWithBody } from './types';
import {
  ErrorCodes,
  ResponseError,
  SalableResponseError,
  SalableUnknownError,
  SalableValidationError,
  ValidationError,
} from '@/src/exceptions/salable-error';

export type BaseRequest = <T, K = void>(endpoint: string, options?: IRequestBase<K>) => Promise<T>;

function getErrorCodeFromStatus(status: number) {
  if (status === 404) return ErrorCodes.notFound;
  if (status === 401) return ErrorCodes.unauthorised;
  if (status >= 400 && status < 500) return ErrorCodes.badRequest;
  if (status >= 500) return ErrorCodes.unhandled;
  throw new SalableUnknownError('Salable SDK error. Unknown status code');
}

export class Base {
  protected _apiKey;
  protected _request: BaseRequest;

  constructor(apiKey: string, apiUrl = SALABLE_BASE_URL) {
    this._apiKey = apiKey;

    if (new.target === Base) {
      throw new Error('You cannot instantiate an abstract class!');
    }

    /**
     *  Internal request base for Salable Node SDK
     *
     * @typeParam T - Type of the returned data from the endpoint
     * @typeParam K - Type of the body data if required (optional)
     *
     * @param endpoint - The endpoint being requested
     * @param options - The options for the request (body, headers, method) (optional)
     *
     * @returns A promise which resolves to data from the endpoint passed or an error
     */
    this._request = async <T, K = void>(
      endpoint: string,
      options?: IRequestBase<K>
    ): Promise<T> => {
      const url = `${apiUrl}/${endpoint}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': this._apiKey,
        version: 'v2',
        ...options?.headers,
      };

      const config = {
        headers,
        ...(options && isRequestWithBody<K>(options)
          ? {
              ...options,
              body: JSON.stringify(options?.body),
            }
          : options),
      };

      const response = await fetch(url, config);
      let errorResponse;

      try {
        if (response.status >= 200 && response.status < 300) {
          if (response.headers.get('Content-Type') !== 'application/json') return '' as T;
          return (await response.json()) as Promise<T>;
        }
        if (response.headers.get('Content-Type') === 'application/json') {
          errorResponse = (await response.json()) as Record<string, unknown>;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw new SalableUnknownError();
      }

      if (!errorResponse) {
        throw new SalableResponseError(getErrorCodeFromStatus(response.status), response.status);
      }

      if (errorResponse.validationErrors) {
        throw new SalableValidationError(
          ErrorCodes.validation,
          response.status,
          errorResponse as ValidationError
        );
      }

      throw new SalableResponseError(
        getErrorCodeFromStatus(response.status),
        response.status,
        errorResponse as ResponseError
      );
    };
  }
}

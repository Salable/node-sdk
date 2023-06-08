import { SALABLE_BASE_URL } from './constants';
import 'isomorphic-fetch';
import { IRequestBase, isRequestWithBody } from './types';

export class Base {
  protected _apiKey;
  protected _request;

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
    ): Promise<T | undefined> => {
      const url = `${apiUrl}/${endpoint}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': this._apiKey,
        ...options?.headers,
      };

      const config = {
        headers,
        ...(options && isRequestWithBody<K>(options)
          ? {
              ...options,
              body: JSON.stringify(options?.body),
            }
          : { ...options }),
      };

      const response = await fetch(url, config);

      if (response.status < 300 && response.status >= 200) {
        // eslint-disable-next-line no-console
        console.log(response);
        if (response.body || response.status !== 204) {
          try {
            return (await response.json()) as Promise<T>;
          } catch (e) {
            return undefined;
          }
        }
        return undefined;
      } else {
        throw new Error(response.statusText);
      }
    };
  }
}

import { SALABLE_BASE_URL } from '../constants';
import 'isomorphic-fetch';

export class Base {
  protected _apiKey;
  protected _request;

  constructor(apiKey: string) {
    this._apiKey = apiKey;

    if (new.target === Base) {
      throw new Error('You cannot instantiate an abstract class!');
    }

    this._request = async <T>(
      endpoint: string,
      options?: RequestInit
    ): Promise<T> => {
      const url = `${SALABLE_BASE_URL}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': this._apiKey,
      };

      const config = {
        ...options,
        headers,
      };

      return fetch(url, config).then((response) => {
        if (response.ok) {
          return response.json() as Promise<T>;
        }
        throw new Error(response.statusText);
      });
    };
  }
}

import { baseUrl } from "../constants";
import "isomorphic-fetch";

export class RequestBase {
  public apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };
    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }
}

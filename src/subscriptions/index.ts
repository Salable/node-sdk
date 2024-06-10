import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  CancelWhen,
  CursorPaginationArgs,
  CursorPaginationResponse,
  GetSubscriptionInvoicesResponse,
  ISubscription,
  ISubscriptionAddSeatsBody,
  ISubscriptionAddSeatsParams,
  ISubscriptionRemoveSeatsBody,
  ISubscriptionRemoveSeatsParams,
  SubscriptionsChangePlanBody,
} from '../types';

/**
 * Salable Node SDK Subscription Class
 *
 * Contains the Salable subscription methods
 */

type GetAllSubscriptionsArgs = CursorPaginationArgs & {
  email?: string;
  status?: string;
};

type GetAllSubscriptionsResponse = CursorPaginationResponse & {
  data: ISubscription[];
};
export default class Subscriptions extends Base {
  /**
   * Get a single subscription
   *
   * @param  {string} subscriptionId The uuid of the subscription
   *
   * @returns {Promise<ISubscription>} The data of the subscription requested
   */
  public getOne(subscriptionId: string): Promise<ISubscription> {
    return this._request<ISubscription>(`${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}`);
  }

  /**
   * Get all subscriptions for an organisation (cursor pagination)
   *
   * @param  {GetAllSubscriptionsArgs} options optional config for cursor based pagination
   *
   * @returns {Promise<GetSubscriptionInvoicesResponse>}
   */

  public getAll(options?: GetAllSubscriptionsArgs): Promise<GetAllSubscriptionsResponse> {
    let params = '';
    if (options) {
      const paramsArr: string[] = [];
      if (options.take) paramsArr.push(`take=${options.take}`);
      if (options.cursor) paramsArr.push(`cursor=${options.cursor}`);
      if (options.email) paramsArr.push(`email=${options.email}`);
      if (options.status) paramsArr.push(`status=${options.status}`);
      params = `?${paramsArr.join('&')}`;
    }
    return this._request<GetAllSubscriptionsResponse>(`${RESOURCE_NAMES.SUBSCRIPTIONS}${params}`);
  }

  /**
   *  Change a subscription's plan
   *
   * @param {subscriptionUuid} subscriptionUuid - Subscription uuid
   * @param {SubscriptionsChangePlanBody} config - Change subscription plan options
   *
   * @returns {Promise<void>}
   */

  public changePlan(subscriptionUuid: string, config: SubscriptionsChangePlanBody): Promise<void> {
    return this._request<void, SubscriptionsChangePlanBody>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/change-plan`,
      {
        method: 'PUT',
        body: config,
      }
    );
  }

  /**
   * Cancel's a subscription
   *
   * @param  {string} subscriptionId The uuid of the subscription to cancel
   * @param  {CancelWhen} when Whether you want to cancel the subscription now or end of cycle
   *
   * @returns {Promise<void>}
   */

  public cancel(subscriptionId: string, when: CancelWhen): Promise<void> {
    return this._request<void>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}/cancel?when=${when}`,
      {
        method: 'PUT',
      }
    );
  }

  /**
   * Add Seats to a Subscription
   *
   * @param  {string} subscriptionId The uuid of the subscription
   * @param  {ISubscriptionAddSeatsParams} config Config to be passed in to the add seats method
   *
   * @returns {Promise<void>}
   */

  public addSeats(subscriptionId: string, config: ISubscriptionAddSeatsParams): Promise<void> {
    return this._request<void, ISubscriptionAddSeatsBody>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}/seats`,
      {
        method: 'POST',
        body: config,
      }
    );
  }

  /**
   * Remove Seats from a Subscription
   *
   * @param  {string} subscriptionId The uuid of the subscription
   * @param  {ISubscriptionRemoveSeatsParams} config Config to be passed in to the remove seats method
   *
   * @returns {Promise<void>}
   */

  public removeSeats(
    subscriptionId: string,
    config: ISubscriptionRemoveSeatsParams
  ): Promise<void> {
    return this._request<void, ISubscriptionRemoveSeatsBody>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}/seats`,
      {
        method: 'PUT',
        body: config,
      }
    );
  }

  /**
   * Get all invoices for a subscription (cursor pagination)
   *
   * @param  {string} subscriptionUuid The uuid of the subscription
   * @param  {CursorPaginationArgs} options optional config for cursor based pagination
   *
   * @returns {Promise<GetSubscriptionInvoicesResponse>}
   */

  public getInvoices(
    subscriptionUuid: string,
    options?: CursorPaginationArgs
  ): Promise<GetSubscriptionInvoicesResponse> {
    let params = '';
    if (options) {
      const paramsArr: string[] = [];
      if (options.take) paramsArr.push(`take=${options.take}`);
      if (options.cursor) paramsArr.push(`cursor=${options.cursor}`);
      params = `?${paramsArr.join('&')}`;
    }
    return this._request<GetSubscriptionInvoicesResponse>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionUuid}/invoices${params}`
    );
  }
}

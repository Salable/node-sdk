import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import {
  CancelWhen,
  ISubscription,
  ISubscriptionAddSeatsBody,
  ISubscriptionAddSeatsParams,
  ISubscriptionRemoveSeatsBody,
  ISubscriptionRemoveSeatsParams,
  ISubscriptionUpdatePlanInput,
  SubscriptionsChangePlanBody,
} from '../types';

/**
 * Salable Node SDK Subscription Class
 *
 * Contains the Salable subscription methods
 */
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
   * Update a subscription's plan (DEPRECATED)
   *
   * @param  {string} newPlanId The uuid of the new plan
   * @param  {string} subscriptionId The uuid of the subscription
   *
   * @returns {Promise<void>}
   */

  public updatePlan(newPlanId: string, subscriptionId: string): Promise<void> {
    return this._request<void, ISubscriptionUpdatePlanInput>(
      `${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}/updateplan/${newPlanId}`,
      {
        method: 'PUT',
      }
    );
  }

  /**
   *  Change a subscription's plan
   *
   * @param {subscriptionUuid} - Subscription uuid
   * @param {SubscriptionsChangePlanBody} - Change subscription plan options
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
}

import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { CancelWhen, ISubscription, ISubscriptionUpdatePlanInput } from '../types';

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
  public getOne(subscriptionId: string): Promise<ISubscription | undefined> {
    return this._request<ISubscription>(`${RESOURCE_NAMES.SUBSCRIPTIONS}/${subscriptionId}`);
  }

  /**
   * Update a subscription's plan
   *
   * @param  {string} newPlanId The uuid of the new plan
   * @param  {string} subscriptionId The uuid of the subscription
   *
   * @returns {Promise<void>}
   */

  public updatePlan(newPlanId: string, subscriptionId: string): Promise<void> {
    return this._request<void, ISubscriptionUpdatePlanInput>(RESOURCE_NAMES.SUBSCRIPTIONS, {
      method: 'PUT',
      body: {
        newPlanId,
        subscriptionId,
      },
    });
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
}

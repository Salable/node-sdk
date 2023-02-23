import { Base } from '../base';
import { ISubscription } from '../types';

const resourceName = 'subscriptions';

/**
 * Salable Third Party API Subscription Class
 *
 * Contains the Salable Third Party API subscription methods
 */

export default class Subscriptions extends Base {
  /**
   * Get a subscription
   *
   * @param  {string} subscriptionId `the uuid of the subscription`
   */
  getSubscription(subscriptionId: string): Promise<ISubscription> {
    return this._request(`/${resourceName}/${subscriptionId}`);
  }

  /**
   * Change a subscription's plan
   *
   * @param  {string} newPlanId `the uuid of the new plan`
   * @param  {string} subscriptionId `the uuid of the subscription`
   */

  changePlan(newPlanId: string, subscriptionId: string) {
    return this._request(`/${resourceName}`, {
      method: 'PUT',
      body: JSON.stringify({
        newPlanId,
        subscriptionId,
      }),
    });
  }
}

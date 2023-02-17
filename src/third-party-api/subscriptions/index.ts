import { Base } from '../base';
import { CancelWhen, ISubscription } from '../types';

const resourceName = 'subscriptions';

export default class Subscriptions extends Base {
  getSubscription(subscriptionId: string): Promise<ISubscription[]> {
    return this._request(`/${resourceName}/${subscriptionId}`);
  }

  cancelSubscription(
    subscriptionId: string,
    when: CancelWhen
  ): Promise<ISubscription[]> {
    return this._request(
      `/${resourceName}/${subscriptionId}/cancel?when=${when}`,
      {
        method: 'PUT',
      }
    );
  }
}

import { Base } from '../base';
import { ISubscription } from '../types';

const resourceName = 'subscriptions';

export default class Subscriptions extends Base {
  getSubscription(subscriptionId: string): Promise<ISubscription[]> {
    return this._request(`/${resourceName}/${subscriptionId}`);
  }
}

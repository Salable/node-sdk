import { Base } from '../base';
import { ISubscription } from '../types';

const resourceName = 'subscriptions';

interface IChangePlanConfig {
  newPlanId: string;
  subscriptionId: string;
}
export default class Subscriptions extends Base {
  getSubscription(subscriptionId: string): Promise<ISubscription[]> {
    return this._request(`/${resourceName}/${subscriptionId}`);
  }

  changePlan(planConfig: IChangePlanConfig) {
    return this._request(`/${resourceName}`, {
      method: 'PUT',
      body: JSON.stringify({
        newPlanId: planConfig.newPlanId,
        subscriptionId: planConfig.subscriptionId,
      }),
    });
  }
}

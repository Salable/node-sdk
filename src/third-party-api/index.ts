import { Base } from './base';
import Licenses from './licenses';
import Subscriptions from './subscriptions';

export class ThirdPartyApi extends Base {
  public licenses: Licenses = new Licenses(this._apiKey);
  public subscriptions: Subscriptions = new Subscriptions(this._apiKey);
}

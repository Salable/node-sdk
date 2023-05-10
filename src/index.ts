import { Base } from './base';
import Licenses from './licenses';
import Subscriptions from './subscriptions';
import Usage from './usage';

export class Salable extends Base {
  public licenses: Licenses = new Licenses(this._apiKey);
  public subscriptions: Subscriptions = new Subscriptions(this._apiKey);
  public usage: Usage = new Usage(this._apiKey);
}

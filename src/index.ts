import { Base } from './base';
import Licenses from './licenses';
import Plans from './plans';
import Products from './products';
import Rbac from './rbac';
import Subscriptions from './subscriptions';
import Usage from './usage';

export class Salable extends Base {
  public licenses: Licenses = new Licenses(this._apiKey);
  public subscriptions: Subscriptions = new Subscriptions(this._apiKey);
  public products: Products = new Products(this._apiKey);
  public plans: Plans = new Plans(this._apiKey);
  public usage: Usage = new Usage(this._apiKey);
  public rbac: Rbac = new Rbac(this._apiKey);
}

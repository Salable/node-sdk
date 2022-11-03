import { Base } from './base';
import Licenses from './licenses';

export class ThirdPartyApi extends Base {
  public licenses: Licenses = new Licenses(this.apiKey);
}

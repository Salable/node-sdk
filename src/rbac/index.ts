import { Base } from '../base';
import Permissions from './permissions';
import Roles from './roles';
import Users from './users';

/**
 * Salable Node SDK RBAC Class
 *
 * Contains the Salable RBAC methods
 */
export default class Rbac extends Base {
  public permissions: Permissions = new Permissions(this._apiKey);
  public roles: Roles = new Roles(this._apiKey);
  public users: Users = new Users(this._apiKey);
}

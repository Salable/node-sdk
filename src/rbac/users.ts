import { Base } from '../base';
import { RESOURCE_NAMES } from '../constants';
import { ICreateRbacUserInput, IRbacUser, IUpdateRbacUserInput } from '../types';

/**
 * Salable Node SDK RBAC Users Class
 *
 * Contains the Salable RBAC Users methods
 * @deprecated
 */
export default class Users extends Base {
  /**
   *  Get all users
   * @deprecated
   * @returns {Promise<IRbacUser[]>} All users
   */
  public getAll(): Promise<IRbacUser[]> {
    return this._request<IRbacUser[]>(RESOURCE_NAMES.RBAC.USERS);
  }

  /**
   *  Get a single user
   *
   * @param {string} uuid - The UUID of the user to get
   * @deprecated
   * @returns {Promise<IRbacUser>} The details for the user UUID passed
   */
  public getOne(uuid: string): Promise<IRbacUser> {
    return this._request<IRbacUser>(`${RESOURCE_NAMES.RBAC.USERS}/${uuid}`);
  }

  /**
   *  Create a new user
   *
   * @param {ICreateRbacUserInput} userDetails - The details of the new user to be created
   * @deprecated
   * @returns {Promise<IRbacUser>} The created user
   */
  public create(userDetails: ICreateRbacUserInput): Promise<IRbacUser> {
    return this._request<IRbacUser, ICreateRbacUserInput>(RESOURCE_NAMES.RBAC.USERS, {
      method: 'POST',
      body: userDetails,
    });
  }

  /**
   *  Deletes a user
   *
   * @param {string} uuid - The UUID of the user to delete
   * @deprecated
   * @returns {Promise<void>} The created user
   */
  public delete(uuid: string): Promise<void> {
    return this._request<void>(`${RESOURCE_NAMES.RBAC.USERS}/${uuid}`, {
      method: 'DELETE',
    });
  }

  /**
   *  Updates a user
   *
   * @param {string} uuid - The UUID of the user to update
   * @param {IUpdateRbacUserInput} userDetails - The details to update the user with
   * @deprecated
   * @returns {Promise<IRbacUser>} The updated user
   */
  public update(uuid: string, userDetails: IUpdateRbacUserInput): Promise<IRbacUser> {
    return this._request<IRbacUser, IUpdateRbacUserInput>(`${RESOURCE_NAMES.RBAC.USERS}/${uuid}`, {
      method: 'PUT',
      body: userDetails,
    });
  }
}

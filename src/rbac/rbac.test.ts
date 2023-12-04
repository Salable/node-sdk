import fetch from 'jest-fetch-mock';
import { BaseRequest } from '../base';
import Rbac from './index';

const api = new Rbac('test-key');
const requestSpyOnUsers = jest.spyOn(api.users as unknown as { _request: BaseRequest }, '_request');
const requestSpyOnPermissions = jest.spyOn(
  api.permissions as unknown as { _request: BaseRequest },
  '_request'
);
const requestSpyOnRoles = jest.spyOn(api.roles as unknown as { _request: BaseRequest }, '_request');

fetch.enableMocks();

const mockResponse = { mockProperty: 'example' };

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify(mockResponse), {
    headers: { 'Content-Type': 'application/json' },
  });
});

describe('Unit | ThirdPartyAPI | Plans', () => {
  describe('Users', () => {
    it('Get a user: should return the response unchanged', async () => {
      const fetchedUser = await api.users.getOne('xxxxx');
      expect(fetchedUser).toStrictEqual(mockResponse);
      expect(requestSpyOnUsers).toHaveBeenCalledWith('rbac/users/xxxxx');
    });
    it('Get all users: should return the response unchanged', async () => {
      const fetchedUsers = await api.users.getAll();
      expect(fetchedUsers).toStrictEqual(mockResponse);
      expect(requestSpyOnUsers).toHaveBeenCalledWith('rbac/users');
    });
    it('Create user: should return the response unchanged', async () => {
      const createdUser = await api.users.create({
        id: 'xxxxx',
        name: 'name',
        role: 'role',
        permissions: ['permission'],
      });
      expect(createdUser).toStrictEqual(mockResponse);
      expect(requestSpyOnUsers).toHaveBeenCalledWith('rbac/users', {
        method: 'POST',
        body: {
          id: 'xxxxx',
          name: 'name',
          role: 'role',
          permissions: ['permission'],
        },
      });
    });
    it('Update user: should return the response unchanged', async () => {
      const updatedUser = await api.users.update('aaaaa', {
        id: 'xxxxx',
        name: 'name',
        role: 'role',
        permissions: {
          add: ['permission'],
          remove: ['other-permission'],
        },
      });
      expect(updatedUser).toStrictEqual(mockResponse);
      expect(requestSpyOnUsers).toHaveBeenCalledWith('rbac/users/aaaaa', {
        method: 'PUT',
        body: {
          id: 'xxxxx',
          name: 'name',
          role: 'role',
          permissions: {
            add: ['permission'],
            remove: ['other-permission'],
          },
        },
      });
    });
    it('Delete user: should return the response unchanged', async () => {
      fetch.mockResponse('', {
        headers: { 'Content-Type': 'text/plain' },
      });
      const updatedUser = await api.users.delete('aaaaa');
      expect(updatedUser).toStrictEqual('');
      expect(requestSpyOnUsers).toHaveBeenCalledWith('rbac/users/aaaaa', { method: 'DELETE' });
    });
  });

  describe('Roles', () => {
    it('Get a role: should return the response unchanged', async () => {
      const fetchedRole = await api.roles.getOne('xxxxx');
      expect(fetchedRole).toStrictEqual(mockResponse);
      expect(requestSpyOnRoles).toHaveBeenCalledWith('rbac/roles/xxxxx');
    });
    it('Get all role: should return the response unchanged', async () => {
      const fetchedRoles = await api.roles.getAll();
      expect(fetchedRoles).toStrictEqual(mockResponse);
      expect(requestSpyOnRoles).toHaveBeenCalledWith('rbac/roles');
    });
    it('Create role: should return the response unchanged', async () => {
      const createdRole = await api.roles.create({
        name: 'name',
        description: 'description',
        permissions: ['permission'],
      });
      expect(createdRole).toStrictEqual(mockResponse);
      expect(requestSpyOnRoles).toHaveBeenCalledWith('rbac/roles', {
        method: 'POST',
        body: {
          name: 'name',
          description: 'description',
          permissions: ['permission'],
        },
      });
    });
    it('Update role: should return the response unchanged', async () => {
      const updatedRoles = await api.roles.update('aaaaa', {
        name: 'name',
        description: 'description',
        permissions: {
          add: ['permission'],
          remove: ['other-permission'],
        },
      });
      expect(updatedRoles).toStrictEqual(mockResponse);
      expect(requestSpyOnRoles).toHaveBeenCalledWith('rbac/roles/aaaaa', {
        method: 'PUT',
        body: {
          name: 'name',
          description: 'description',
          permissions: {
            add: ['permission'],
            remove: ['other-permission'],
          },
        },
      });
    });
    it('Delete role: should return the response unchanged', async () => {
      fetch.mockResponse('', {
        headers: { 'Content-Type': 'text/plain' },
      });
      const deleteRole = await api.roles.delete('aaaaa');
      expect(deleteRole).toStrictEqual('');
      expect(requestSpyOnRoles).toHaveBeenCalledWith('rbac/roles/aaaaa', { method: 'DELETE' });
    });
  });

  describe('Permissions', () => {
    it('Get a permission: should return the response unchanged', async () => {
      const fetchedPermission = await api.permissions.getOne('xxxxx');
      expect(fetchedPermission).toStrictEqual(mockResponse);
      expect(requestSpyOnPermissions).toHaveBeenCalledWith('rbac/permissions/xxxxx');
    });
    it('Get all permissions: should return the response unchanged', async () => {
      const fetchedPermissions = await api.permissions.getAll();
      expect(fetchedPermissions).toStrictEqual(mockResponse);
      expect(requestSpyOnPermissions).toHaveBeenCalledWith('rbac/permissions');
    });
    it('Create permission: should return the response unchanged', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const createdPermission = await api.permissions.create({
        value: 'value',
        type: 'type',
        description: 'description',
        dependencies: { dependency: 'xxxxx' },
        createdAt,
        updatedAt,
        rbacUsers: ['user'],
        roles: ['role'],
      });
      expect(createdPermission).toStrictEqual(mockResponse);
      expect(requestSpyOnPermissions).toHaveBeenCalledWith('rbac/permissions', {
        method: 'POST',
        body: {
          value: 'value',
          type: 'type',
          description: 'description',
          dependencies: { dependency: 'xxxxx' },
          createdAt,
          updatedAt,
          rbacUsers: ['user'],
          roles: ['role'],
        },
      });
    });
    it('Update permission: should return the response unchanged', async () => {
      const updatedPermissions = await api.permissions.update('aaaaa', {
        value: 'value',
        type: 'type',
        description: 'description',
        dependencies: ['xxxxx'],
      });
      expect(updatedPermissions).toStrictEqual(mockResponse);
      expect(requestSpyOnPermissions).toHaveBeenCalledWith('rbac/permissions/aaaaa', {
        method: 'PUT',
        body: {
          value: 'value',
          type: 'type',
          description: 'description',
          dependencies: ['xxxxx'],
        },
      });
    });
    it('Delete permission: should return the response unchanged', async () => {
      fetch.mockResponse('', {
        headers: { 'Content-Type': 'text/plain' },
      });
      const deletePermission = await api.permissions.delete('aaaaa');
      expect(deletePermission).toStrictEqual('');
      expect(requestSpyOnPermissions).toHaveBeenCalledWith('rbac/permissions/aaaaa', {
        method: 'DELETE',
      });
    });
  });
});

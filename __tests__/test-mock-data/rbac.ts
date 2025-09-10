import objectBuilder from './object-builder';
import { randomUUID } from 'crypto';

export const mockRbacPermission = objectBuilder({
  value: 'xxxxx',
  type: 'xxxxx',
  description: 'xxxxx',
  dependencies: ['xxxxx'],
  organisation: undefined as string | undefined,
});

export const mockRbacRole = objectBuilder({
  name: 'xxxxx',
  description: 'xxxxx',
  permissions: ['xxxxx'],
  organisation: undefined as string | undefined,
});

export const mockRbacRoleUpdate = objectBuilder({
  name: undefined as string | undefined,
  description: undefined as string | undefined,
  permissions: { add: [] as string[], remove: [] as string[] },
});

export const mockRbacUser = objectBuilder({
  id: randomUUID(),
  name: 'xxxxx',
  role: 'xxxxx',
  permissions: ['xxxxx'],
  organisation: undefined as string | undefined,
});

export const mockRbacUserUpdate = objectBuilder({
  id: undefined as string | undefined,
  name: undefined as string | undefined,
  role: undefined as string | undefined,
  permissions: { add: [] as string[], remove: [] as string[] },
});

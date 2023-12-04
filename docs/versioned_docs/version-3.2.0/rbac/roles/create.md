---
sidebar_position: 3
---

# Create Role

This method will create a new role

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const role = await salable.rbac.roles.create({
  name: 'some-name',
  description: 'some-description',
  permissions: ['41cf33a2-136e-4959-b5c7-73889ab94eff', '41cf33a2-136e-4959-b5c7-73889ab94eff'],
});
```

## Parameters

### roleDetails (_required_)

_Type:_ `ICreateRoleInput`

The details of the new role to be created

## Return Type

Promise that resolves to the created role

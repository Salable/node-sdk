---
sidebar_position: 3
---

# Create Role

This method will create a new role

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const role = await salable.rbac.roles.create({
      name: 'some-name',
      description: 'some-description',
      permissions: ['41cf33a2-136e-4959-b5c7-73889ab94eff', '41cf33a2-136e-4959-b5c7-73889ab94eff'],
    });
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### roleDetails (_required_)

_Type:_ `ICreateRoleInput`

The details of the new role to be created

## Return Type

Promise that resolves to the created role

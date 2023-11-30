---
sidebar_position: 3
---

# Create Permission

This method will create a new permission

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const permission = await salable.rbac.permissions.create({
      value: 'some-value',
      type: 'some-type',
      description: 'some-description',
      dependencies: {
        key: 'some-value',
      },
      rbacUsers: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
      roles: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
    });
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### permissionDetails (_required_)

_Type:_ `ICreatePermissionInput`

The details of the new permission to be created

## Return Type

Promise that resolves to the created permission

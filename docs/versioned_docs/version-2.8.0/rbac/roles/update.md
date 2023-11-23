---
sidebar_position: 5
---

# Update Role

This method will update an existing role

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const role = await salable.rbac.roles.update('41cf33a2-136e-4959-b5c7-73889ab94eff', {
      name: 'some-name',
      description: 'some-description',
      permissions: {
        add: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
        remove: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
      },
    });
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the role you want to update

---

### roleDetails (_required_)

_Type:_ `IUpdateRoleInput`

The details to update on the role

## Return Type

Promise that resolves to the updated role

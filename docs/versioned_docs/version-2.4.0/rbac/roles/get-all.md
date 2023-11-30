---
sidebar_position: 1
---

# Get All Roles

This method returns all roles

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API_KEY}}');

  try {
    const roles = await salable.rbac.roles.getAll();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of all roles

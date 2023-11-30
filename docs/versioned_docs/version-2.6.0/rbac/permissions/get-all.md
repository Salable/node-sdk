---
sidebar_position: 1
---

# Get All Permissions

This method returns all permissions

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API_KEY}}');

  try {
    const permissions = await salable.rbac.permissions.getAll();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of all permissions

---
sidebar_position: 1
---

# Get All Users

This method returns all users

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const users = await salable.rbac.users.getAll();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

Promise of all users

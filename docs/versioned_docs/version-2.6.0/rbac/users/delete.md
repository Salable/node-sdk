---
sidebar_position: 4
---

# Delete User

This method will delete an existing user

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    await salable.rbac.users.delete('41cf33a2-136e-4959-b5c7-73889ab94eff');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the user you want to delete

## Return Type

A promise of type void

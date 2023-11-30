---
sidebar_position: 4
---

# Delete Permission

This method will delete an existing permission

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API_KEY}}');

  try {
    await salable.rbac.permissions.delete('41cf33a2-136e-4959-b5c7-73889ab94eff');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the permission you want to delete

## Return Type

A promise of type void

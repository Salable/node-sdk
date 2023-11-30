---
sidebar_position: 2
---

# Get One Permission

Returns the details of a single permission.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API_KEY}}');

  try {
    const permission = await salable.rbac.permissions.getOne(
      '41cf33a2-136e-4959-b5c7-73889ab94eff'
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the permission you want to retrieve

## Return Type

Promise of a permission object

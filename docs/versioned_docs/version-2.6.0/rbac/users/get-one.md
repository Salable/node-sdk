---
sidebar_position: 2
---

# Get One User

Returns the details of a single user.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const user = await salable.rbac.users.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the user you want to retrieve

## Return Type

Promise of a user object

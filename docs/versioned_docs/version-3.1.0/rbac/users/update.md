---
sidebar_position: 5
---

# Update User

This method will update an existing user

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const user = await salable.rbac.users.update('41cf33a2-136e-4959-b5c7-73889ab94eff', {
  id: 'some-id',
  name: 'some-name',
  role: '41cf33a2-136e-4959-b5c7-73889ab94eff',
  permissions: {
    add: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
    remove: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
  },
});
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the user you want to update

---

### userDetails (_required_)

_Type:_ `IUpdateRbacUserInput`

The details to update on the user

## Return Type

Promise that resolves to the updated user

---
sidebar_position: 2
---

# Get One User

Returns the details of a single user.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{API-KEY}');

const user = await salable.rbac.users.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the user you want to retrieve

## Return Type

Promise of a user object

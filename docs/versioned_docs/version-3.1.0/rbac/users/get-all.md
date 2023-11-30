---
sidebar_position: 1
---

# Get All Users

This method returns all users

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{API-KEY}');

const users = await salable.rbac.users.getAll();
```

## Return Type

Promise of all users

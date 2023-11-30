---
sidebar_position: 1
---

# Get All Roles

This method returns all roles

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{API-KEY}');

const roles = await salable.rbac.roles.getAll();
```

## Return Type

Promise of all roles

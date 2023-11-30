---
sidebar_position: 1
---

# Get All Permissions

This method returns all permissions

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{API-KEY}');

const permissions = await salable.rbac.permissions.getAll();
```

## Return Type

Promise of all permissions

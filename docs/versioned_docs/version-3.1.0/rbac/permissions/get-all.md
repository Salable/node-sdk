---
sidebar_position: 1
---

# Get All Permissions

This method returns all permissions

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const permissions = await salable.rbac.permissions.getAll();

```

## Return Type

Promise of all permissions

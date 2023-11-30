---
sidebar_position: 4
---

# Delete Permission

This method will delete an existing permission

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    await salable.rbac.permissions.delete('41cf33a2-136e-4959-b5c7-73889ab94eff');

```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the permission you want to delete

## Return Type

A promise of type void

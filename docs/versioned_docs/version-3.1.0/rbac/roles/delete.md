---
sidebar_position: 4
---

# Delete Role

This method will delete an existing role

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.rbac.roles.delete('41cf33a2-136e-4959-b5c7-73889ab94eff');
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the role you want to delete

## Return Type

A promise of type void

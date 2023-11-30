---
sidebar_position: 2
---

# Get One Permission

Returns the details of a single permission.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const permission = await salable.rbac.permissions.getOne('41cf33a2-136e-4959-b5c7-73889ab94eff');
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the permission you want to retrieve

## Return Type

Promise of a permission object

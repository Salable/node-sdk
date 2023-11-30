---
sidebar_position: 3
---

# Create User

This method will create a new user

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const user = await salable.rbac.users.create({
      id: 'some-id',
      name: 'some-name',
      role: '41cf33a2-136e-4959-b5c7-73889ab94eff',
      permissions: ['41cf33a2-136e-4959-b5c7-73889ab94eff'],
    });

```

## Parameters

### userDetails (_required_)

_Type:_ `ICreateRbacUserInput`

The details of the new user to be created

## Return Type

Promise that resolves to the created user

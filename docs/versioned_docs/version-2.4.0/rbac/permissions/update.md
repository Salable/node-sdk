---
sidebar_position: 5
---

# Update Permission

This method will update an existing permission

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const permission = await salable.rbac.permissions.update(
      '41cf33a2-136e-4959-b5c7-73889ab94eff',
      {
        value: 'some-value',
        type: 'some-type',
        description: 'some-description',
        dependencies: {
          key: 'some-value',
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

### uuid (_required_)

_Type:_ `string`

`uuid` of the permission you want to update

---

### permissionDetails (_required_)

_Type:_ `IUpdatePermissionInput`

The details to update on the permission

## Return Type

Promise that resolves to the updated permission

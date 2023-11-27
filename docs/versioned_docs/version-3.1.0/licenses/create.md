---
sidebar_position: 1
---

# Create License

This method will create one or many a new adhoc licenses.

## Code Sample

### Create one

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const license = await salable.licenses.create({
      planUuid: '{PLAN_UUID}',
      member: 'orgId_1234',
      granteeId: 'userId-1',
    });
  } catch (err) {
    console.error(err);
  }
})();
```

### Create many

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    const license = await salable.licenses.create([
      {
        planUuid: '{PLAN_UUID}',
        member: 'orgId_1234',
        granteeId: 'userId-1',
      },
      {
        planUuid: '{PLAN_UUID}',
        member: 'orgId_1234',
        granteeId: 'userId-2',
      },
    ]);
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### planUuid (_required_)

_Type:_ `string`

`uuid` of the Plan you wish to create the License on

---

##### member (_required_)

_Type:_ `string`

The ID of the member who will manage the license

---

##### granteeId (_required_)

_Type:_ `string` or `null`

The grantee ID for the license

## Return Type

For more information about this request see our api documentation on [License Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

---
sidebar_position: 6
---

# Get Licenses Count

This method returns aggregate count number of Licenses. Optional filters can be applied through query parameters.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const licenseCount = await api.licenses.getCount('{{SUBSCRIPTION_UUID}}');
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

#### subscriptionUuid

_Type:_ `string`

The `uuid` of the subscription to filter the license count

#### status

_Type:_ `string`

The `status` of the license to filter by

## Return Type

```json
{
  "count": 10,
  "assigned": 7,
  "unassigned": 3
}
```

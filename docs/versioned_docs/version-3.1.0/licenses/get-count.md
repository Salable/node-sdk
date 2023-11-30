---
sidebar_position: 7
---

# Get Licenses Count

This method returns aggregate count number of Licenses.

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

#### subscriptionUuid (_required_)

_Type:_ `string`

The `uuid` of the subscription to filter the license count

#### status

_Type:_ `string`

The `status` of the license to filter by

## Return Type

For more information about this request see our api documentation on [License count](https://docs.salable.app/api#tag/Licenses/operation/getLicensesCount)

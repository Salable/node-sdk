---
sidebar_position: 2
---

# Check License

This method returns the capabilities assigned to a group of granteeIds.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const capabilitiesCheck = await salable.licenses.check('{{PLAN_UUID}}', [
      'userId_1',
      'userId_2',
    ]);
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### productUuid (_required_)

_Type:_ `string`

Product `uuid` of the capabilities you wish to check

---

##### granteeIds (_required_)

_Type:_ `string[]`

A String array of the grantee Ids you wish to check against

---

##### grace

_Type:_ `number`

The number of days to extend the end dates of capabilities

## Return Type

For more information about this request see our API documentation on [License Check Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseCheck)

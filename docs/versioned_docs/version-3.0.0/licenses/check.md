---
sidebar_position: 2
---

# Check License

This method returns the capabilities assigned to a granteeId or product.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const capabilitiesCheck = await salable.licenses.check('41cf33a2-136e-4959-b5c7-73889ab94eff', [
      'grantee1',
      'grantee2',
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

## Return Type

For more information about this request see our api documentation on [License Check Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseCheck)
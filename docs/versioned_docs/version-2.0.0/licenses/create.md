---
sidebar_position: 1
---

# Create License

This method will create a new adhoc license to allow Specific IDs to use your product.

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('API-KEY');

  try {
    const license = await salable.licenses.create({
      planUuid: '41cf33a2-136e-4959-b5c7-73889ab94eff',
      member: 'tester@testing.com',
      granteeId: 'grantee-123',
    });
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

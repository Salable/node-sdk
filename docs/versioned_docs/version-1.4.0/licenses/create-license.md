---
sidebar_position: 1
---

# Create License

This method will create a new adhoc license to allow Specific IDs to use your product.

## Code Sample

```typescript
const { SalableApi } = require("@Salable/node-sdk");
(async () => {
  const api = new SalableApi("API-KEY");
  try {
    const license = await api.licenses.createLicense({
      planUuid: "41cf33a2-136e-4959-b5c7-73889ab94eff";
      member: "orgId_1234"
      granteeId: "grantee-123"
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

##### member (_required_)

_Type:_ `string`

The ID of the member who will manage the license

---

##### granteeId (_required_)

_Type:_ `string` or `null`

The grantee ID for the license

## Return Type

For more information about this request see our api documentation on [License Check Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseCheck)

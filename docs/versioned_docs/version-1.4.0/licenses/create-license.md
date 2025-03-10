---
sidebar_position: 1
---

# Create License

This method will create a new ad hoc license to allow Specific IDs to use your product.

## Code Sample

```typescript
const { SalableApi } = require("@Salable/node-sdk");

  const salable = new SalableApi("API-KEY");

    const license = await salable.licenses.createLicense({
      planUuid: "41cf33a2-136e-4959-b5c7-73889ab94eff";
      member: "orgId_1234"
      granteeId: "grantee-123"
    });

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

For more information about this request see our API documentation on [License Check Object](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicenseCheck)

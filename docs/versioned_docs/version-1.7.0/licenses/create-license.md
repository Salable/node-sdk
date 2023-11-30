---
sidebar_position: 1
---

# Create License

This method will create a new ad hoc license to allow Specific IDs to use your product.

## Code Sample

```typescript
const { SalableApi } = require('@salable/node-sdk');

const api = new SalableApi('API-KEY');

const license = await api.licenses.createLicense({
  planUuid: '{{PLAN_UUID}}',
  member: 'orgId_1234',
  granteeId: 'userId-1234',
});
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

For more information about this request see our API documentation on [License Check Object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseCheck)

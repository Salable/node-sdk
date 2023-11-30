---
sidebar_position: 5
---

# Update Many Licenses

This method updates many Licenses with the values passed into the body of the request.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const updatedLicenses = await salable.licenses.updateMany([
  { granteeId: 'userId_1', uuid: '{{LICENSE_UUID_ONE}}' },
  { granteeId: 'userId_2', uuid: '{{LICENSE_UUID_TWO}}' },
]);
```

## Parameters

### updateManyConfig (_required_)

_Type:_ `IUpdateManyLicenseInput[]`

All config options which can be passed in to this method

#### uuid (_required_)

_Type:_ `string`

The `uuid` of the license to be updated

#### granteeId (_required_)

_Type:_ `string` or `null`

The value of the new granteeId. To un-assign a license set the `granteeId` to `null`.

## Return Type

For more information about this request see our API documentation on [licenses object](https://docs.salable.app/api#tag/Licenses/operation/getLicenseByUuid)

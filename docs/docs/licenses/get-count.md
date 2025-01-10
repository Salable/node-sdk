---
sidebar_position: 5
---

# Get Licenses Count

This method returns aggregate count number of Licenses.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const licenseCount = await salable.licenses.getCount({subscriptionUuid: '9eeabc1b-cffd-488c-b242-e1fc80c5fc0c', status: 'ACTIVE'});
```

## Parameters

#### options

_Type:_ `GetLicenseCountOptions`

| Option           | Type   | Description              | Required |
| ---------------- | ------ | ------------------------ | -------- |
| subscriptionUuid | string | Filter by subscription   | ❌        |
| status           | string | Filter by license status | ❌        |

## Return Type

For more information about this request see our API documentation on [License count](https://docs.salable.app/api/v2#tag/Licenses/operation/getLicensesCount)

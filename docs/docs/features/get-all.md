---
sidebar_position: 1
---

# Get All Features

Returns a list of features with cursor based pagination.

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

const features = await salable.features.getAll({
  productUuid: '431b0c60-a145-4ae4-a7e6-391761b018ba'
});
```

## Parameters

#### options (_required_)

_Type:_ `GetAllFeaturesOptionsV3`

| **Parameter** | **Type**        | **Description**                                     | **Required** |
|:--------------|:----------------|:----------------------------------------------------|:------------:|
| productUuid   | string          | The product to retrieve features for                |      ✅       |
| cursor        | string          | Cursor value, used for pagination                   |      ❌       |
| take          | number          | The number of subscriptions to fetch. Default: `20` |      ❌       |
| sort          | `asc` \| `desc` | Default `asc`                                       |      ❌       |

## Return Type

For more information about this request see our API documentation on [get all features](https://docs.salable.app/api/v3#tag/Features/operation/getFeatures).

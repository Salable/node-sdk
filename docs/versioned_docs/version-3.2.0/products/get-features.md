---
sidebar_position: 5
---

# Get Features

Returns a list of all the features associated with a product

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');
(async () => {
  const salable = new Salable('{{API-KEY}}');

  try {
    const features = await salable.products.getFeatures();
  } catch (err) {
    console.error(err);
  }
})();
```

## Return Type

For more information about this request see our api documentation on [Feature Object](https://docs.salable.app/api#tag/Products/operation/getProductFeatures)

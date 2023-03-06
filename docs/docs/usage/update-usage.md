---
sidebar_position: 1
---

# Update Usage

This method updates a plan's usage

## Code Sample

```typescript
const { SalableApi } = require("@Salable/node-sdk");
(async () => {
  const api = new SalableApi("API-KEY");
  try {
    await api.usage.updateUsage(
      licenseUuid: "41cf33a2-136e-4959-b5c7-73889ab94eff",
      featureVariableName: "new-feature",
      countOptions: {
        increment: 2
      }
    );
  } catch (err) {
    console.error(err);
  }
})();
```

## Parameters

##### licenseUuid (_required_)

_Type:_ `string`

License `uuid` of the license you wish to update

##### featureVariableName (_required_)

_Type:_ `string`

The variable name of the feature to be updated

##### countOptions (_required_)

_Type:_ `ICountOptions`

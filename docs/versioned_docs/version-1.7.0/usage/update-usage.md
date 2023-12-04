---
sidebar_position: 1
---

# Update Usage

Increments usage count on a License

## Code Sample

```typescript
const { SalableApi } = require('@salable/node-sdk');

const api = new SalableApi('API-KEY');

await api.usage.updateUsage('41cf33a2-136e-4959-b5c7-73889ab94eff', 'new-feature', {
  increment: 2,
});
```

## Parameters

##### licenseUuid (_required_)

_Type:_ `string`

The `uuid` of the License to update the usage on

##### featureVariableName (_required_)

_Type:_ `string`

The variable name of the feature to be updated

##### countOptions (_required_)

_Type:_ `ICountOptions`

| Option    | Description                          |
| --------- | ------------------------------------ |
| increment | The number to increment the count by |

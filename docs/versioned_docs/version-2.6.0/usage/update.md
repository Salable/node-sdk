---
sidebar_position: 1
---

# Update Usage

Increments usage count on a License

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

await salable.usage.update('{{LICENSE_UUID}}', '{{FEATURE_VARIABLE_NAME}}', {
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

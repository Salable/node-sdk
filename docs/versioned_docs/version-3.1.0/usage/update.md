---
sidebar_position: 1
---

# Update Usage

This method updates a plan's usage

## Code Sample

```typescript
const { Salable } = require('@salable/node-sdk');

(async () => {
  const salable = new Salable('{API-KEY}');

  try {
    await salable.usage.update('41cf33a2-136e-4959-b5c7-73889ab94eff', 'new-feature', {
      increment: 2,
    });
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

<details>
  <summary>ICountOptions</summary>
  <div>
    increment: <code>number</code>
    <br />
    <em>Amount by which you want to increment the usage. Has to be a postive integer.</em>
  </div>
</details>

---
sidebar_position: 1
---

# Create Session

This methods creates a new session to use with the Salable web components

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const event = await salable.sessions.create({
    scope: SessionScope.PricingTable,
      metadata: {
        productUuid: '3ab5c243-7052-4906-bdd5-a93500f2dbf0',
      },
});
```

## Parameters

#### createSessionParams (_required_)

_Type:_ `CreateSessionInput`

| Option   | Type   | Description                                      | Required |
| -------- | ------ | ------------------------------------------------ | -------- |
| scope    | string | The component the created session will be used with | ✅        |
| metadata | object | Additional data needed for the session (varies by scope) | ✅        |

## Return Type

For more information about this request see our API documentation on [License Object](https://docs.salable.app/api/v2#tag/Sessions/operation/createSession)

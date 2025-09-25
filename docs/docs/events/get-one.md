---
sidebar_position: 1
---

# Get One Event

Returns a single event

## Code Sample

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('{{API_KEY}}', 'v3');

const event = await salable.events.getOne('431b0c60-a145-4ae4-a7e6-391761b018ba');
```

## Parameters

#### eventUuid (_required_)

_Type:_ `string`

The UUID of the event

## Return Type

For more information about this request see our API documentation on [Event Object](https://docs.salable.app/api/v3#tag/Events/operation/getEventByUuid)

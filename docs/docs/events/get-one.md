---
sidebar_position: 1
---

# Get One Event

Returns a single event

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const event = await salable.events.getOne('431b0c60-a145-4ae4-a7e6-391761b018ba');
```

## Parameters

#### eventUuid (_required_)

_Type:_ `string`

The UUID of the event

## Return Type

For more information about this request see our API documentation on [Event Object](https://docs.salable.app/api/v2#tag/Events/operation/getEventByUuid)

---
sidebar_position: 13
---

# Verify License Checks

This method can be used to verify license checks using your organsiations public key, the signature, and the capabilities returned from a license check method.

## Code Sample

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');

const verified = salable.licenses.verify({
    publicKey: 'your_public_key',
    signature: 'license_check_signature',
    payload: JSON.stringify([
        {
            capability: 'capability_1', 
            expiry: '2024-08-14T13:15:49.310Z'
        },
        {
            capability: 'capability_2', 
            expiry: '2024-08-14T13:32:29.313Z'
        },
        {
            capability: 'capability_3', 
            expiry: '2024-08-14T13:32:29.313Z'
        }
    ]),
});
```

## Parameters

#### verifyLicenseParams (_required_)

_Type:_ `{ publicKey: String; signature: String; payload: String }`

| Option    | Type   | Description                                    | Required |
| --------- | ------ | ---------------------------------------------- | -------- |
| publicKey | string | The public key belonging to your organisation  | ✅        |
| signature | string | The signature returned from a license check    | ✅        |
| payload   | string | The capabilities returned from a license check | ✅        |

## Return Type

`boolean`

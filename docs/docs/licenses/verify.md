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
            capability: '92a0da61-b36e-47e4-8df0-78152b9e3996', 
            expiry: '2024-08-14T13:15:49.310Z'
        },
        {
            capability: '61d04055-04a9-4a5c-9561-6ea16e023624', 
            expiry: '2024-08-14T13:32:29.313Z'
        },
        {
            capability: '82d0e657-a689-4fd4-8b2d-35b7327b9281', 
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

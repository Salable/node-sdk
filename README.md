> [!CAUTION]
> This SDK was made for Legacy Salable and isn't compatible with the latest version of the software.

# Salable SDK for JavaScript

The Salable SDK enables you to easily interact with the Salable ecosystem, accessing the Salable API, and other toolkit methods.

## Getting Started

Let’s walk through setting up a project that uses the Salable API Class from the SDK and makes a simple call to retrieve all licenses. The following steps use npm as an example. These steps assume you have Node.js and npm already installed.

1. Create a new Node.js project.
2. Inside of the project, run: `npm install @salable/node-sdk`. Adding packages results in update in lock file, [yarn.lock](https://yarnpkg.com/getting-started/qa/#should-lockfiles-be-committed-to-the-repository) or [package-lock.json](https://docs.npmjs.com/configuring-npm/package-lock-json). You **should** commit your lock file along with your code to avoid potential breaking changes.

## v5.0.0 Update

The SDK now supports Salable API version selection and developers can choose which version of the Salable API they want to interact with via the SDK
As such, the Salable API version is now a required argument when instantiating the SDK

```typescript
import { initSalable } from '@salable/node-sdk';

const salable = initSalable('your_api_key', 'v3');
```

### General Changes

#### Salable API versioning and Types
- Types and method documentation are dynamic and automatically adjust to the version selected

```typescript
import { initSalable } from '@salable/node-sdk';

const salableV2 = initSalable('your_api_key', 'v2');
const salableV3 = initSalable('your_api_key', 'v3');

// "licenses.check" method is supported in this version and will work
await salableV2.licenses.check(); 

// This will error as all "licenses" methods has been deprecated in 'v3'
await salableV3.licenses.check(); // Will error with: "Property 'licenses' does not exist ..."
```
#### Pagination
- All methods are now scope authorized and your API Key must contain the appropriate scopes to user certain methods
- `getAll` endpoints are now paginated and offer cursor based pagination

```typescript
{
	first: "item-id-1",
	last: "item-id-3",
	data: [
		{id: "item-id-1"}, 
		{id: "item-id-2"}, 
		{id: "item-id-3"}
	]
}
```

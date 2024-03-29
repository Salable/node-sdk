Salable SDK for JavaScript

The Salable SDK enables you to easily interact with the Salable ecosystem, accessing the Salable API, and other toolkit methods.

## Getting Started

Let’s walk through setting up a project that uses the Salable API Class from the SDK and makes a simple call to retrieve all licenses. The following steps use npm as an example. These steps assume you have Node.js and npm already installed.

1. Create a new Node.js project.
2. Inside of the project, run: `npm install @salable/node-sdk`. Adding packages results in update in lock file, [yarn.lock](https://yarnpkg.com/getting-started/qa/#should-lockfiles-be-committed-to-the-repository) or [package-lock.json](https://docs.npmjs.com/configuring-npm/package-lock-json). You **should** commit your lock file along with your code to avoid potential breaking changes.

3. Create a new file called index.js, Instantiate a Salable Class and send a request.

```typescript
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}');

const check = await salable.licenses.check('{{PRODUCT_UUID}}', ['userId_1']);
```

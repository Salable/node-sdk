---
sidebar_position: 1
---

# Overview

Salable is designed to be a flexible tool to allow you to integrate your app with your chosen payment provider easily. The advantage of using Salable is that you can more easily make changes to your pricing structures, and you can offer more options to your customers. Instead of having to go to many places to get the flexibility you need, you can do it all through Salable.

Our Node SDK exposes HTTP endpoints that accept requests with JSON arguments and return JSON responses. Authentication is done via the API key passed to the `Salable` class.

Specific versions of the Salable API can also be specified as the second argument of the `Salable` constructor function.

```ts
import { Salable } from '@salable/node-sdk';

const salable = new Salable('{{API_KEY}}', 'v2');
```

> NOTE: If you'd like to use test mode, make sure to use an API key generated in test mode (prefixed with `test_`).

To get up and running, you need to work through the following steps.

- Set up a Salable Account and Organization
- Generate your API key
- Connect Stripe to Salable (You can skip this for a free product)
- Build your products and plans
- Install the Node SDK to your project
- Make your first SDK call

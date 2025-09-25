---
sidebar_position: 2
---

# Changelog

## v5.0.0

### Breaking Changes

The `Salable` class has been replaced with a new `initSalable` function. Using the new initialise function will enable 
vendors to use `v2` or `v3` of the API within the same version of the SDK.

**v4.0.0 implementation**
```typescript
const salable = new Salable('your-api-key', 'v2');
```
**v5.0.0 implementation**
```typescript
const salableV2 = initSalable('your-api-key', 'v2'); // v2 still supported
const salableV3 = initSalable('your-api-key', 'v3');
```

### V3 Breaking changes

#### Capabilities deprecated
Capabilities used to be stored on the License at the point of creation with no way of editing them. We found this to be
too rigid, for flexibility we have deprecated capabilities in favour of using the plan's feature values which are
editable in the Salable app.

##### Deprecated methods that use capabilities
### Capabilities deprecated
Capabilities used to be stored on the License at the point of creation with no way of editing them. Instead, we have now
opted to use the plan's features which allow you to update a grantee’s access on-the-fly through the Salable dashboard.

#### Deprecated capabilities deprecated
- `plans.capabilities`
- `products.capabilities`
- `licenses.check`

#### Licenses deprecated 
All license methods have been deprecated in favour of managing them through the subscription instead. This gives a
consistent implementation across all types of subscriptions.
- `licenses.create` moved to `subscriptions.create` - the `owner` value will be applied to the `purchaser` field of the license.
- `licenses.check` moved to `entitlements.check`
- `licenses.getAll` moved to `subscriptions.getSeats`
- `licenses.getOne` support removed - fetch the parent subscription instead using `subscriptions.getOne`
- `licenses.getForPurchaser` moved to `subscriptions.getAll` with the owner filter applied.
- `licenses.update` moved to `subscriptions.update`
  - To update a seat's grantee use the `subscriptions.manageSeats` method.
- `licenses.updateMany` moved to `subscriptions.manageSeats`
- `licenses.getCount` moved to `subscriptions.getSeatCount`
- `licenses.cancel` moved to `subscriptions.cancel` - this will cancel all the subscription's child licenses.
- `licenses.cancelMany` moved to `subscriptions.cancel` - it is not possible to cancel many subscriptions in the same request.

#### Other deprecated endpoints 
- `products.getFeatures` moved to `features.getAll` with the `productUuid` filter applied.
- `products.getPlans` moved to `plans.getAll` with the `productUuid` filter applied.
- `subscriptions.addSeats` moved to `subscriptions.updateSeatCount` with `increment` set.
- `subscriptions.removeSeats` moved to `subscriptions.updateSeatCount` with `decerement` set.

#### Affected responses
- `products.getAll` now uses cursor-based pagination in the response.

### What's new?
#### New methods
- `features.getAll` - Retrieves all features for an organisation. The response uses cursor-based pagination.
- `plans.getAll` - Retrieves all plans for an organisation. The response uses cursor-based pagination.
- `subscriptions.updateSeatCount` - v2 of the API required two different endpoints to add and remove seats on a per-seat subscription. In v3 this has been aligned under one method `subscriptions.updateSeatCount`. 
- `entitlements.check` - Check grantee access to specific features (replaces `licenses.check`).

**v4.0.0 SDK with API v2**
```typescript
const salable = new Salable('your-api-key', 'v2');
const check = await salable.licenses.check({
  productUuid: 'your-product-uuid',
  granteeIds: ['your-grantee-id'],
});
const hasAccess = check?.capabilities.find((c) => c.capability === 'your-boolean-feature');
```

**v5.0.0 SDK with API v3**
```typescript
const salable = initSalable('your-api-key', 'v3');
const check = await salable.entitlements.check({
  productUuid: 'your-product-uuid',
  granteeIds: ['your-grantee-id'],
});
const hasAccess = check.features.find((f) => f.feature === 'your-boolean-feature');
```

## v4.0.0

### Breaking Changes

- Salable API versions are now supported and `Version` is now a required argument upon `Salable` instantiation. (Currently supports `v2`)
  - Support for `v1` of the Salable API has been deprecated

### Licenses

- `getAll` now supports cursor based pagination, licenses can also be filtered by `status`, `subscriptionUuid`, `planUuid`, `productUuid`, and `granteeId`
- `getOne` and `getForGranteeId` now offer an `expand` option to expand certain properties (e.g. `plan` etc)
- `getForPurchaser` no longer offers `cancelLink` as an option
- `getUsage` has been deprecated
- `create` and `createMany` are now separate methods, `status` and `endTime` have been added as optional parameters
- `update` method parameters have been changed to have an object as the second parameter, the `granteeId` property is where the grantee ID value can be assigned 
- `cancelMany` method parameter has been updated to be an object, the `uuids` property is where an array of license UUIDs to cancel can be assigned 
- `verifyLicenseCheck` has been renamed to `verify`

### Plans

- `getOne` now offers an `expand` option to expand certain properties (e.g. `product` etc) 
- `getCheckoutLink` options have now been updated: 
  - `vat` is no longer supported and has been deprecated 
  - `customer` has been deprecated and been replaced with `customerId` and `customerEmail`
  - `contactUsLink` has been deprecated
  - `marketingConsent` has been deprecated
  - `couponCode` has been deprecated
  - `customMessage` has been deprecated
  - `automaticTax`, `changeQuantity`, and `requirePaymentMethod` have been added

### Pricing Tables

- `getOne` options have been updated. The only supported options are now `granteeId` and `currency`

### Products

- `getOne` now offers an `expand` option to expand certain properties (e.g. `plan` etc)
- `getPricingTable` options have been updated. The only supported options are now `granteeId` and `currency`

### Subscriptions

- `getOne` now offers an `expand` option to expand certain properties (e.g. `plan` etc)
- `getAll` method added. Retrieves a list of all subscriptions
- `getInvoices` method added. Retrieves a list of invoices for a subscription
- `getSwitchablePlans` method added. Retrieves a list of available plans that a subscribed user can switch to
- `getUpdatePaymentLink` method added. Retrieves the update payment portal link for a specific subscription
- `getPortalLink` method added. Retrieves the customer portal link for a subscription
- `getCancelSubscriptionLink` method added. Retrieves the cancel subscription portal link for a specific subscription
- `getPaymentMethod` method added. Retrieves the payment method used to pay for a subscription
- `reactivateSubscription` method added. Reactivate a Subscription's scheduled cancellation before the billing period has passed
- `updatePlan` method has been deprecated
- `addSeats` and `removeSeats` now optionally allow proration as an option

### Usage (NEW)

- `getAllUsageRecords` gets all usage records for grantee's metered licenses
- `getCurrentUsageRecord` gets current usage record for grantee on plan
- `updateLicenseUsage` updates a license's usage

### RBAC (DEPRECATED)

- All RBAC methods have been deprecated and currently not supported by the SDK

### Other Changes

- **DOCS**: JSDoc and SDK documentation have been updated
- interfaces have been replaced with types
- `403` and `404` errors now specifically handled

## v3.2.0

### Licenses

- Added `getOne`, `getForPurchaser`, `getForGranteeId`, `getUsage` & `getCount` licenses methods to SDK.

## v3.1.0

### Licenses

- Added `getOne`, `getForPurchaser`, `getForGranteeId`, `getUsage` & `getCount` licenses methods to SDK.

## v3.0.0

### Error handling

- Added new Error classes `SalableResponseError`, `SalableValidationError` and `SalableUnknownError`
- New error codes

More information on [error handling](./errors.md)

## v2.8.0

### Subscriptions

- Added `changePlan` subscriptions method to SDK.

### Pricing Tables

- Added `getOne` pricing tables method to SDK.

## v2.7.0

### Licenses

- Added `update`, `updateMany` & `getCount` licenses methods to SDK.

## v2.6.0

### Subscriptions

- Added `addSeats` & `removeSeats` subscription methods to SDK.

## v2.5.0

### Features

- Added `Products` (`getOne`, `getCheckoutLink`, `getFeatures`, `getCapabilities`, `getCurrencies`) methods to SDK.

## v2.4.0

### Features

- Added `plans` (`getOne`, `getCheckoutLink`, `getFeatures`, `getCapabilities`, `getCurrencies`) methods to SDK.

### Other Changes

- **DOCS**: Updated links to resources object documentation

## v2.3.0

### Features

- Added URL support in constructor for passing API URL

## v2.2.0

### Features

- Added `cancel` subscription method to SDK.

## v2.1.0

### Features

- Added `rbac` (`permissions`, `users`, `roles`) methods to SDK.

### Other Changes

- **DOCS**: Updated documentation mistakes and inaccuracies

## v2.0.0

### Breaking Changes

- Top level export `SalableApi` renamed to `Salable`
- `getLicenses()` renamed to `getAll()`
- `createLicense()` renamed to `create()`
- `checkLicenses()` renamed to `check()`
- `getSubscription()` renamaed to `getOne()`
- `changePlan()` renmaed to `updatePlan()`
- `updateUsage()` renamed to `update()`

### Other Changes

- **DOCS:** JSDoc documentation added to all methods for each class
- **FEAT:** Updated internal `_request` method to support TS Generics for return and argument types
- **CHORE:** Restructured repository contents so endpoints aren't contained inside a `third-party-api` folder.

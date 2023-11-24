---
sidebar_position: 2
---

# Changelog

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

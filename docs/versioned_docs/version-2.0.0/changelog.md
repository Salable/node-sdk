---
sidebar_position: 1
---

# Changelog

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

# [4.8.0](https://github.com/Salable/node-sdk/compare/v4.7.0...v4.8.0) (2025-05-22)


### Features

* add archived columns to product and plan ([4e7b7c5](https://github.com/Salable/node-sdk/commit/4e7b7c551d04e51fd74675b8ecab6592b00cd489))

# [4.7.0](https://github.com/Salable/node-sdk/compare/v4.6.0...v4.7.0) (2025-05-16)


### Features

* subscriptions create method ([66e1da7](https://github.com/Salable/node-sdk/commit/66e1da7997a37b5a8f990c500d252658803d511f))

# [4.6.0](https://github.com/Salable/node-sdk/compare/v4.5.0...v4.6.0) (2025-05-13)


### Bug Fixes

* typo ([d30eee7](https://github.com/Salable/node-sdk/commit/d30eee7ec955ce6b8e9f2118d9a606441c4d6140))


### Features

* **SD-2083:** added paymentIntegrationPromoCodeId column to PromotionCode table ([eb50b43](https://github.com/Salable/node-sdk/commit/eb50b43b4a167055b6e7cc763102485b17b50adc))

# [4.5.0](https://github.com/Salable/node-sdk/compare/v4.4.0...v4.5.0) (2025-05-12)


### Features

* new subscriptions manageSeats method ([fe40853](https://github.com/Salable/node-sdk/commit/fe4085328db83f54e9b0810ae58eee7701a5be5f))

# [4.4.0](https://github.com/Salable/node-sdk/compare/v4.3.0...v4.4.0) (2025-05-07)


### Features

* new subscription methods getSeats and getSeatCount ([9b557d9](https://github.com/Salable/node-sdk/commit/9b557d926e0c5ec44e039664a11235d268d76309))

# [4.3.0](https://github.com/Salable/node-sdk/compare/v4.2.0...v4.3.0) (2025-04-24)


### Features

* sync prisma schema ([e246c8e](https://github.com/Salable/node-sdk/commit/e246c8e527fcbf13580ed7daa54b2bbe21ca4d27))

# [4.2.0](https://github.com/Salable/node-sdk/compare/v4.1.0...v4.2.0) (2025-03-07)


### Bug Fixes

* added owner to plans get checkout link ([9c384a9](https://github.com/Salable/node-sdk/commit/9c384a9acebe96af17d7bcd851f499e4f9c3af39))


### Features

* subscription owner nullable ([b744b51](https://github.com/Salable/node-sdk/commit/b744b5150d8e6596029c497991a28f1fe5fda297))
* update subscription method ([f12e046](https://github.com/Salable/node-sdk/commit/f12e0464fca277e9f415fb87bc11d5a653cc5d6c))

# [4.1.0](https://github.com/Salable/node-sdk/compare/v4.0.0...v4.1.0) (2025-03-07)


### Features

* session resource and docs ([e0238f5](https://github.com/Salable/node-sdk/commit/e0238f5df25dc12b390d1c0026a3e6432fbed01e))

# [4.1.0-beta.1](https://github.com/Salable/node-sdk/compare/v4.0.0...v4.1.0-beta.1) (2025-03-07)


### Features

* session resource and docs ([e0238f5](https://github.com/Salable/node-sdk/commit/e0238f5df25dc12b390d1c0026a3e6432fbed01e))

# [4.1.0-beta.1](https://github.com/Salable/node-sdk/compare/v4.0.0...v4.1.0-beta.1) (2025-03-07)


### Features

* added none to PaymentIntegration in schema ([64a325f](https://github.com/Salable/node-sdk/commit/64a325f49f0b1ecfa7ba7093e704312b30aada34))
* session resource and docs ([2bb7d44](https://github.com/Salable/node-sdk/commit/2bb7d4415f59a4b62086366724028ccf0ca580d1))
* subscription owner nullable ([b744b51](https://github.com/Salable/node-sdk/commit/b744b5150d8e6596029c497991a28f1fe5fda297))

# [4.1.0-beta.1](https://github.com/Salable/node-sdk/compare/v4.0.0...v4.1.0-beta.1) (2025-03-07)


### Features

* session resource and docs ([2bb7d44](https://github.com/Salable/node-sdk/commit/2bb7d4415f59a4b62086366724028ccf0ca580d1))

# [4.1.0-beta.2](https://github.com/Salable/node-sdk/compare/v4.1.0-beta.1...v4.1.0-beta.2) (2025-02-24)


### Features

* session resource with testing ([35f4323](https://github.com/Salable/node-sdk/commit/35f43239e84deb301672d53cbfe55ed99ad9c99b))

# [4.1.0-beta.1](https://github.com/Salable/node-sdk/compare/v4.0.0...v4.1.0-beta.1) (2025-02-13)


### Features

* **SD-1479:** deleted verify method from licenses ([4f50a85](https://github.com/Salable/node-sdk/commit/4f50a850979e337ee76a16b44218b008168a4977))

# [4.0.0](https://github.com/Salable/node-sdk/compare/v3.4.1...v4.0.0) (2025-01-23)


### Bug Fixes

* added name to error class constructors ([d78a27d](https://github.com/Salable/node-sdk/commit/d78a27da7e469c8ba75b6bc67abaa629dc090785))
* added type for current usage. Changed update usage params to an object ([0b5f41a](https://github.com/Salable/node-sdk/commit/0b5f41aa8228e57576f363875d618bd8df749a44))
* amend the options type for create and update license resource ([9287b0a](https://github.com/Salable/node-sdk/commit/9287b0ac5da316de34a615a1f8ad317061011d36))
* amending the correct response type for get subscriptions ([e7f4044](https://github.com/Salable/node-sdk/commit/e7f40444ff717770048e3445412a095c3ec1cacf))
* changed take to number type. Added pagination to invoices ([35b05c9](https://github.com/Salable/node-sdk/commit/35b05c902c2dbd61244ac7b024cb36cc793899b3))
* created more test data ([0a8dfd7](https://github.com/Salable/node-sdk/commit/0a8dfd770798200ad2327104eeb9714d1721247c))
* fixed path to types in build ([62b093c](https://github.com/Salable/node-sdk/commit/62b093c634572e11d7ee344ff6e3a6b35dc7e977))
* get all subscriptions new params. Run tests sequentially ([a14ba58](https://github.com/Salable/node-sdk/commit/a14ba58efd8aa149b9ef8cdd30865c6f1b329135))
* removed console log ([9d2d7e0](https://github.com/Salable/node-sdk/commit/9d2d7e03eacd18d8a619091006c0da7030e38597))
* resolved conflicts ([4fdd63c](https://github.com/Salable/node-sdk/commit/4fdd63cda50c04abb93bf7f902fbba49e5c5bc84))
* run coverage tests sequentially ([e0196df](https://github.com/Salable/node-sdk/commit/e0196df45263d0f919d662b9fb03ef51884ece56))
* subscription invoice schema mismatch ([0c9d6db](https://github.com/Salable/node-sdk/commit/0c9d6db65bca21a48947dadaec0e2e3d928f3dfc))
* throw SalableRequestError if 404 ([dce5bb4](https://github.com/Salable/node-sdk/commit/dce5bb44dbf0b20fad1d4db74860bb92d1b34dd4))
* updated get invoices test ([a87cd26](https://github.com/Salable/node-sdk/commit/a87cd26e5ca830b58ad8d66ced6a6d8da9b0b638))
* updated schema with new indexes ([f89f3b0](https://github.com/Salable/node-sdk/commit/f89f3b00e3d61a55d995bc6659c2b2a1d741a70f))
* updated usage methods to follow params in an object pattern. Removed upsert from tests ([a0a5151](https://github.com/Salable/node-sdk/commit/a0a5151420abe85ca530ad9f6d76982575996cea))


### Features

* event resource and methods with documentation ([71c23b1](https://github.com/Salable/node-sdk/commit/71c23b12974556b51ab80defe6368eb2b2ad9b83))
* export salable errors ([1f23502](https://github.com/Salable/node-sdk/commit/1f23502a73029613d221c0b519532ac1ec82f858))
* v4 ([0bfd077](https://github.com/Salable/node-sdk/commit/0bfd0773f76fbedfc8da75503d09b7dd4c137234))


### BREAKING CHANGES

* v4 update

# [4.0.0-beta.11](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.10...v4.0.0-beta.11) (2025-01-23)


### Bug Fixes

* changed take to number type. Added pagination to invoices ([35b05c9](https://github.com/Salable/node-sdk/commit/35b05c902c2dbd61244ac7b024cb36cc793899b3))
* updated get invoices test ([a87cd26](https://github.com/Salable/node-sdk/commit/a87cd26e5ca830b58ad8d66ced6a6d8da9b0b638))

# [4.0.0-beta.10](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.9...v4.0.0-beta.10) (2025-01-23)


### Bug Fixes

* deprecate rbac ([b75d464](https://github.com/Salable/node-sdk/commit/b75d464d1d01a9d801f097920bdf89758aadaecd))
* resolved conflicts ([4fdd63c](https://github.com/Salable/node-sdk/commit/4fdd63cda50c04abb93bf7f902fbba49e5c5bc84))

# [4.0.0-beta.9](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.8...v4.0.0-beta.9) (2025-01-23)


### Bug Fixes

* updated schema with new indexes ([f89f3b0](https://github.com/Salable/node-sdk/commit/f89f3b00e3d61a55d995bc6659c2b2a1d741a70f))

# [4.0.0-beta.8](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.7...v4.0.0-beta.8) (2025-01-22)


### Bug Fixes

* created more test data ([0a8dfd7](https://github.com/Salable/node-sdk/commit/0a8dfd770798200ad2327104eeb9714d1721247c))
* get all subscriptions new params. Run tests sequentially ([a14ba58](https://github.com/Salable/node-sdk/commit/a14ba58efd8aa149b9ef8cdd30865c6f1b329135))
* removed console log ([9d2d7e0](https://github.com/Salable/node-sdk/commit/9d2d7e03eacd18d8a619091006c0da7030e38597))
* run coverage tests sequentially ([e0196df](https://github.com/Salable/node-sdk/commit/e0196df45263d0f919d662b9fb03ef51884ece56))

# [4.0.0-beta.7](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.6...v4.0.0-beta.7) (2025-01-22)


### Bug Fixes

* added type for current usage. Changed update usage params to an object ([0b5f41a](https://github.com/Salable/node-sdk/commit/0b5f41aa8228e57576f363875d618bd8df749a44))
* updated usage methods to follow params in an object pattern. Removed upsert from tests ([a0a5151](https://github.com/Salable/node-sdk/commit/a0a5151420abe85ca530ad9f6d76982575996cea))

# [4.0.0-beta.6](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.5...v4.0.0-beta.6) (2025-01-20)


### Bug Fixes

* throw SalableRequestError if 404 ([dce5bb4](https://github.com/Salable/node-sdk/commit/dce5bb44dbf0b20fad1d4db74860bb92d1b34dd4))

# [4.0.0-beta.5](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.4...v4.0.0-beta.5) (2025-01-17)


### Bug Fixes

* added name to error class constructors ([d78a27d](https://github.com/Salable/node-sdk/commit/d78a27da7e469c8ba75b6bc67abaa629dc090785))

# [4.0.0-beta.4](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2025-01-10)


### Bug Fixes

* amend the options type for create and update license resource ([9287b0a](https://github.com/Salable/node-sdk/commit/9287b0ac5da316de34a615a1f8ad317061011d36))
* subscription invoice schema mismatch ([0c9d6db](https://github.com/Salable/node-sdk/commit/0c9d6db65bca21a48947dadaec0e2e3d928f3dfc))


### Features

* event resource and methods with documentation ([71c23b1](https://github.com/Salable/node-sdk/commit/71c23b12974556b51ab80defe6368eb2b2ad9b83))
* export salable errors ([1f23502](https://github.com/Salable/node-sdk/commit/1f23502a73029613d221c0b519532ac1ec82f858))

# [4.0.0-beta.3](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2025-01-07)


### Bug Fixes

* amending the correct response type for get subscriptions ([e7f4044](https://github.com/Salable/node-sdk/commit/e7f40444ff717770048e3445412a095c3ec1cacf))

# [4.0.0-beta.2](https://github.com/Salable/node-sdk/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2025-01-06)


### Bug Fixes

* fixed path to types in build ([62b093c](https://github.com/Salable/node-sdk/commit/62b093c634572e11d7ee344ff6e3a6b35dc7e977))

# [4.0.0-beta.1](https://github.com/Salable/node-sdk/compare/v3.4.0...v4.0.0-beta.1) (2024-12-11)


### Features

* v4 ([0bfd077](https://github.com/Salable/node-sdk/commit/0bfd0773f76fbedfc8da75503d09b7dd4c137234))


### BREAKING CHANGES

* v4 update

## [3.4.1](https://github.com/Salable/node-sdk/compare/v3.4.0...v3.4.1) (2024-10-10)

### Bug Fixes

- deprecate rbac ([b75d464](https://github.com/Salable/node-sdk/commit/b75d464d1d01a9d801f097920bdf89758aadaecd))

# [3.4.0](https://github.com/Salable/node-sdk/compare/v3.3.0...v3.4.0) (2024-07-12)

### Features

- **SD-168:** added verify-signature method ([c8b4a42](https://github.com/Salable/node-sdk/commit/c8b4a42a83fa72e6884adcfac96cefbddaf0dc20))

# [3.3.0](https://github.com/Salable/node-sdk/compare/v3.2.1...v3.3.0) (2024-02-01)

### Bug Fixes

- fixed licenses cancelMany method ([3cf5fe7](https://github.com/Salable/node-sdk/commit/3cf5fe7c052befd466f94c034214d4dec5043700))

### Features

- currency and quantity parameters added checkout link and pricing table methods ([f822750](https://github.com/Salable/node-sdk/commit/f82275015c83fac69df2b0ab7b6b681821334c24))

## [3.2.1](https://github.com/Salable/node-sdk/compare/v3.2.0...v3.2.1) (2023-12-05)

### Bug Fixes

- added isTest to the response types ([46ba143](https://github.com/Salable/node-sdk/commit/46ba14365b7393b43a4d0417ecf6785d60633bc6))

# [3.2.0](https://github.com/Salable/node-sdk/compare/v3.1.0...v3.2.0) (2023-11-27)

### Features

- added grace as an optional parameter to license check ([39105e8](https://github.com/Salable/node-sdk/commit/39105e806c7dfc4ddbafc0e825e19a8628532457))

# [3.1.0](https://github.com/Salable/node-sdk/compare/v3.0.1...v3.1.0) (2023-11-24)

### Bug Fixes

- updated getByGranteeId response type comment ([143a3a8](https://github.com/Salable/node-sdk/commit/143a3a883339aa8992cfecb74ba807c6e16e3705))

### Features

- create licenses updated to be able to create many licenses ([d0b7f43](https://github.com/Salable/node-sdk/commit/d0b7f4382e38fd7d774bf5eef7e4ac25f80a3978))
- create licenses updated to be able to create many licenses ([9b43b3a](https://github.com/Salable/node-sdk/commit/9b43b3a69be7d9e529766e0e465647dce93dcf7a))
- licenses endpoints up to date ([e0972da](https://github.com/Salable/node-sdk/commit/e0972dacceea6d9723b2969ba5d9e5948bcea133))

## [3.0.1](https://github.com/Salable/node-sdk/compare/v3.0.0...v3.0.1) (2023-11-24)

### Bug Fixes

- improved error handling with more tests ([ece82fe](https://github.com/Salable/node-sdk/commit/ece82fe663a1929359fd1a9a030ceb0c1b014c21))

# [3.0.0](https://github.com/Salable/node-sdk/compare/v2.8.0...v3.0.0) (2023-11-23)

### Bug Fixes

- new error classes to handle empty body responses ([eeeaf49](https://github.com/Salable/node-sdk/commit/eeeaf49132892a59a0d062b2928f0713e7102301))
- updated commitlint action to use actions/checkout@v3 ([a712c5a](https://github.com/Salable/node-sdk/commit/a712c5a3223cc3987957766e6116d7320bdff767))

### Performance Improvements

- **error classes:** throw different error classes in different scenarios ([952d0cd](https://github.com/Salable/node-sdk/commit/952d0cd5227d0b285caa7a34fd79839ec764f134))

### BREAKING CHANGES

- **error classes:** throw different error classes in different scenarios

# [2.8.0](https://github.com/Salable/node-sdk/compare/v2.7.0...v2.8.0) (2023-11-20)

### Bug Fixes

- imports to base ([f805466](https://github.com/Salable/node-sdk/commit/f805466b40c5e09d4c7b19859f3de1b222870924))
- update path to base in plans test ([acb80aa](https://github.com/Salable/node-sdk/commit/acb80aaa0ddb2ba5ccd208e8368ad0278706e898))
- updated import path on base ([a453718](https://github.com/Salable/node-sdk/commit/a453718db88bc9cc187865619633b1547e4f4e6d))

### Features

- pricing tables ([eacef35](https://github.com/Salable/node-sdk/commit/eacef35e8bc466e92f34c8c2348aedf9051c1f3c))
- pricing tables ([60459d0](https://github.com/Salable/node-sdk/commit/60459d04ff2029e8555bec885ae55d5e21a003b6))
- subscriptions change plan endpoint ([7dffdf3](https://github.com/Salable/node-sdk/commit/7dffdf3c900a1f3118d55a648e9ab9a2f8a0d88d))

# [2.7.0](https://github.com/Salable/node-sdk/compare/v2.6.0...v2.7.0) (2023-09-21)

### Features

- new methods to license class ([9221614](https://github.com/Salable/node-sdk/commit/92216147482a2a087918995fefa36fb55ca3410a))

# [2.6.0](https://github.com/Salable/node-sdk/compare/v2.5.0...v2.6.0) (2023-09-18)

### Features

- methods to add & remove seats ([cd1688d](https://github.com/Salable/node-sdk/commit/cd1688d885096ea2703408fdbb3292fa1ff7e30e))

# [2.5.0](https://github.com/Salable/node-sdk/compare/v2.4.0...v2.5.0) (2023-06-29)

### Bug Fixes

- renamed sidebar json file ([85e6de8](https://github.com/Salable/node-sdk/commit/85e6de80ffa658ea1ea7309e9d9c511fe7445550))
- versioned docs changed ([7988cbb](https://github.com/Salable/node-sdk/commit/7988cbb6cb805b2eef44b123b71b03b76397b8bb))
- versions json updated ([abd7721](https://github.com/Salable/node-sdk/commit/abd772191e6b8ff07426c68ffe733d77b1b4dd36))

### Features

- adding detail to pricing table endpoint ([d4bec6a](https://github.com/Salable/node-sdk/commit/d4bec6a45ed57aef24d649bacf7c4ca7cf6a8c05))
- adding product routes ([486f92f](https://github.com/Salable/node-sdk/commit/486f92ff472444082a8055e09493962aeccac242))
- additional product endpoints ([fdecaac](https://github.com/Salable/node-sdk/commit/fdecaac2f0f95a287ec40f1c3fd75f1d6fc44464))

# [2.4.0](https://github.com/Salable/node-sdk/compare/v2.3.1...v2.4.0) (2023-06-05)

### Features

- adding plans class ([2e84262](https://github.com/Salable/node-sdk/commit/2e84262878aa5628449091961ea0ff074ee0a8a3))

## [2.3.1](https://github.com/Salable/node-sdk/compare/v2.3.0...v2.3.1) (2023-06-01)

### Bug Fixes

- added in missing details stripped from request config ([a53b669](https://github.com/Salable/node-sdk/commit/a53b6698b37a874be620ff55bcc410e3c0fe1b83))

# [2.3.0](https://github.com/Salable/node-sdk/compare/v2.2.1...v2.3.0) (2023-06-01)

### Features

- added url support in constructor for passing api url ([3e9c17d](https://github.com/Salable/node-sdk/commit/3e9c17d30eff74d2989efcef28eafb082969cadb))

## [2.2.1](https://github.com/Salable/node-sdk/compare/v2.2.0...v2.2.1) (2023-05-30)

### Bug Fixes

- added INestedPermission and INestedRole interfaces ([c0e63a2](https://github.com/Salable/node-sdk/commit/c0e63a259fe6844a495495650e1b964407117204))
- updated IRole and IRbacUser interfaces ([cfeadcf](https://github.com/Salable/node-sdk/commit/cfeadcf3583d4c3ec0d1eed012df455436f422f0))

# [2.2.0](https://github.com/Salable/node-sdk/compare/v2.1.0...v2.2.0) (2023-05-26)

### Features

- cancel sub ([c4c3c10](https://github.com/Salable/node-sdk/commit/c4c3c10c95f337baf2a9bd168d0be6fcbc7cfa12))

# [2.1.0](https://github.com/Salable/node-sdk/compare/v2.0.0...v2.1.0) (2023-05-23)

### Features

- added rbac endpoints ([87a215e](https://github.com/Salable/node-sdk/commit/87a215ee951d49c975a67380e1bb1ec6eb24b42e))

# [2.0.0](https://github.com/Salable/node-sdk/compare/v1.7.0...v2.0.0) (2023-05-10)

### Features

- restructured the package ([c9d39c8](https://github.com/Salable/node-sdk/commit/c9d39c8406fa7e78236bec0acb6776db2c0608e9))

### BREAKING CHANGES

- Several endpoints have been renamed also the top level export has been renamed.

# [1.7.0](https://github.com/Salable/node-sdk/compare/v1.6.2...v1.7.0) (2023-05-02)

### Features

- adding uuid to usage headers ([30410be](https://github.com/Salable/node-sdk/commit/30410be750f5ebc2b2819e2fbbc3a52b802b1fc0))

## [1.6.2](https://github.com/Salable/node-sdk/compare/v1.6.1...v1.6.2) (2023-04-13)

### Bug Fixes

- adding env variabe to pipeline ([efdeb98](https://github.com/Salable/node-sdk/commit/efdeb98448f0fd3764f152f821f56273bb3e4826))

## [1.6.1](https://github.com/Salable/node-sdk/compare/v1.6.0...v1.6.1) (2023-03-07)

### Bug Fixes

- change the snippet for update usage ([a1c1d34](https://github.com/Salable/node-sdk/commit/a1c1d34164c3b9002a2471e6ed994987b4cfb163))

# [1.6.0](https://github.com/Salable/node-sdk/compare/v1.5.1...v1.6.0) (2023-03-06)

### Features

- old version added ([3a1c2b7](https://github.com/Salable/node-sdk/commit/3a1c2b727b93a43bcecb7a61cb6e28efced04c6f))

## [1.5.1](https://github.com/Salable/node-sdk/compare/v1.5.0...v1.5.1) (2023-03-06)

### Bug Fixes

- added type detailing ([2388257](https://github.com/Salable/node-sdk/commit/2388257c71c3036948b0e5b9faa7c8a5c65c6760))
- typo mistake fixed ([bc8f562](https://github.com/Salable/node-sdk/commit/bc8f562c5bcbf42232992a18a167cee75a2ed462))

# [1.5.0](https://github.com/Salable/node-sdk/compare/v1.4.0...v1.5.0) (2023-02-23)

### Features

- adding upgrade and downgrade subscription method ([7ebb6f2](https://github.com/Salable/node-sdk/commit/7ebb6f2b55175cc4258b03a099e4570df9d16e7d))
- changing params for changePlan method and add test ([dfcc1f2](https://github.com/Salable/node-sdk/commit/dfcc1f298a33d8fe570421026ce3aeade831232f))

# [1.4.0](https://github.com/Salable/node-sdk/compare/v1.3.0...v1.4.0) (2023-02-23)

### Bug Fixes

- fixing misspell ([d2e2eaf](https://github.com/Salable/node-sdk/commit/d2e2eaf9703a3d6d801762d2efdd751c645b6180))

### Features

- adding update usage code ([1a2956d](https://github.com/Salable/node-sdk/commit/1a2956d0a8beb87a0d85170ba13878c7ca49d29b))
- creating usage class ([9506789](https://github.com/Salable/node-sdk/commit/95067893cbd9021e2937fd726c34ceb9e944f1fd))

# [1.3.0](https://github.com/Salable/node-sdk/compare/v1.2.0...v1.3.0) (2022-11-04)

### Bug Fixes

- folder typo ([f5996b4](https://github.com/Salable/node-sdk/commit/f5996b4f322cc2c660a0c4e44edcb1f371bdf08c))

### Features

- adding sub class and get sub method ([bd729a0](https://github.com/Salable/node-sdk/commit/bd729a0eecf973056519f412d87a803a9b3df4fc))

# [1.2.0](https://github.com/Salable/node-sdk/compare/v1.1.0...v1.2.0) (2022-11-03)

### Features

- adding check licenses method ([0253b07](https://github.com/Salable/node-sdk/commit/0253b07f313ac1f54343b84997fd9bd5bdd15d44))
- adding types for check capabilties ([ba95826](https://github.com/Salable/node-sdk/commit/ba9582653a67a30efccb764cdc5e003caf484473))

# [1.1.0](https://github.com/Salable/node-sdk/compare/v1.0.0...v1.1.0) (2022-11-03)

### Features

- adding eslint ignore and changing api export name ([0eff248](https://github.com/Salable/node-sdk/commit/0eff248c302bc3fe8ad99e6d3354927abbd8209c))
- adding licenses class ([f3a6f6c](https://github.com/Salable/node-sdk/commit/f3a6f6c3d4092027cd71ef955d36a45859381e09))
- adding rollup config ([717f4f7](https://github.com/Salable/node-sdk/commit/717f4f74b393c73f98c86305717cfcdf5746a0c0))
- adding type cast to fetch ([f8054dc](https://github.com/Salable/node-sdk/commit/f8054dc629147df7bd893c3d223f21b52d7ac80a))
- lint fix ([ecb45cb](https://github.com/Salable/node-sdk/commit/ecb45cbe7a638a52274297b74c2da4f3b85e4860))
- pushing up build commands and exporting api class ([553dc54](https://github.com/Salable/node-sdk/commit/553dc5486b46437dd2c1cef2d8e1c055ad79268c))

# 1.0.0 (2022-11-01)

### Features

- added semantic-release package ([82e8aca](https://github.com/Salable/node-sdk/commit/82e8acab6988e9f0a75e0e16bff38da2c8b1fedc))

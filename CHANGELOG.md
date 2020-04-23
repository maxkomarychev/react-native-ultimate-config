# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v2.1.0...v2.2.0) (2020-04-23)


### Features

* **android:** experimental: allow auto config per flavor ([265eec5](https://github.com/maxkomarychev/react-native-ultimate-config/commit/265eec57b24177cea6606faf56f198a0a36fe930))

## [2.1.0](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v2.0.1...v2.1.0) (2020-04-22)


### Features

* **android:** expose variables as manifest placeholders ([0ea0a50](https://github.com/maxkomarychev/react-native-ultimate-config/commit/0ea0a50b1c939a8004eaae633d0cb7cbc1772238))

### [2.0.1](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v2.0.0...v2.0.1) (2020-04-20)


### Bug Fixes

* fix warning about main queue in ios ([1b7b28c](https://github.com/maxkomarychev/react-native-ultimate-config/commit/1b7b28cb16e2c6b8fede3e5189f910724755e67b))


### Docs

* replace http links with relative ones ([3c65b3f](https://github.com/maxkomarychev/react-native-ultimate-config/commit/3c65b3f63f587b560d4e417be4e65c4fb9c1c07e))

## [2.0.0](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.7...v2.0.0) (2020-04-19)


### ⚠ BREAKING CHANGES

* this change introduces heavier codegeneration and from
now on generated files must be regenerated with `rnuc` command whenever
library is updated.

Migration notes:

1. remove file `android/app/rnuc.properties`
2. remove entry `rnuc.properties` from `.gitignore`
3. regenerate configs with `yarn rnuc ...` or `npm run rnuc ...`

### Features

* allow providing config via yaml file ([35fca51](https://github.com/maxkomarychev/react-native-ultimate-config/commit/35fca51f7d6dd4b072510c9cf798e31555ed2686))

### [1.2.7](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.6...v1.2.7) (2020-04-17)


### Bug Fixes

* update npmignore ([afda52f](https://github.com/maxkomarychev/react-native-ultimate-config/commit/afda52f50f9dbccd966fba45bf6ec104042dfcc9))

### [1.2.6](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.5...v1.2.6) (2020-04-17)


### Refactor

* do not install lib as a dependency ([c4ef4b5](https://github.com/maxkomarychev/react-native-ultimate-config/commit/c4ef4b5069b1c8b49c43aecfff56c1d72b01b211))


### Tests

* improve testing infra, split unit tests ([21ed16d](https://github.com/maxkomarychev/react-native-ultimate-config/commit/21ed16d9daae378cbd2e2f026377cc27508faa6b))


### Docs

* credit to creat-react-native-module ([d650efa](https://github.com/maxkomarychev/react-native-ultimate-config/commit/d650efaac1a0fb8f1c4d9da097b891d22b4809cf))
* fix typo in .versionrc ([0e61253](https://github.com/maxkomarychev/react-native-ultimate-config/commit/0e61253ee51732471833c06673599168aaf342f9))
* fix versionrc ([79723de](https://github.com/maxkomarychev/react-native-ultimate-config/commit/79723def7013301301531ecbe7615e79d216d920))

### [1.2.5](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.4...v1.2.5) (2020-04-14)

### [1.2.4](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.3...v1.2.4) (2020-04-14)


* provide commands for `npm`, misc changes ([1ea6402](https://github.com/maxkomarychev/react-native-ultimate-config/commit/1ea6402a68557812aa366582ff9a7d7eedc6c40d))
* update config for changelog ([844baa2](https://github.com/maxkomarychev/react-native-ultimate-config/commit/844baa24d0e3891a0409aaccb781203e0a94a451))

### [1.2.3](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.2...v1.2.3) (2020-04-11)


### Bug Fixes

* do not escape values in templates ([8c53789](https://github.com/maxkomarychev/react-native-ultimate-config/commit/8c53789df5b7093b8cf0a361958dcacaf9bee753))
* update typescript definitions ([b42288d](https://github.com/maxkomarychev/react-native-ultimate-config/commit/b42288dcac924235f5ad06541f2a741029f1d351))

### [1.2.2](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.1...v1.2.2) (2020-04-10)

### [1.2.1](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.2.0...v1.2.1) (2020-04-10)

## [1.2.0](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.1.3...v1.2.0) (2020-04-09)


### Features

* support typescript - generate index.d.ts ([193ca62](https://github.com/maxkomarychev/react-native-ultimate-config/commit/193ca623b7f868a3de0a3a741a78f668eb711733))

### [1.1.3](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.1.2...v1.1.3) (2020-04-09)

### [1.1.2](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.1.1...v1.1.2) (2020-04-08)

### [1.1.1](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.1.0...v1.1.1) (2020-04-08)

## [1.1.0](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.0.3...v1.1.0) (2020-04-08)


### Features

* expose bin as executable ([b93ed0c](https://github.com/maxkomarychev/react-native-ultimate-config/commit/b93ed0c5f01c4c4819c70320b3ff3fe969650935))

### [1.0.3](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.0.2...v1.0.3) (2020-04-04)

### [1.0.2](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.0.1...v1.0.2) (2020-03-30)

### [1.0.1](https://github.com/maxkomarychev/react-native-ultimate-config/compare/v1.0.0...v1.0.1) (2020-03-30)

## 1.0.0 (2020-03-30)

# react-native-ultimate-config

_The ultimate config you ever need for your react-native app_

_Project generated with https://github.com/brodybits/create-react-native-module_

## TL;DR usage

1. install
   |npm | yarn |
   |-|-|
   |`npm install react-native-ultimate-config` | `yarn add react-native-ultimate-config`|
2. [one-off setup for native projects](./docs/quickstart.md)
3. initialize env
   |npm | yarn |
   |-|-|
   |`npm run rnuc <env file>`|`yarn rnuc <env file>`|
4. build! `react-native run-{ios,android}`

## ☝❗Approach to versioning and breaking changes

This library is using [semver](https://semver.org/) and heavily relying on codegeneration. Many new features and/or bugfixes will require these files to be regenerated. Changes to codegenerated files will not be considered breaking
unless they affect behavior of API or CLI.

Therefore every time this library is updated all files MUST be regenerated using `rnuc` command.

## Table of contents

1. [Features](#features)
1. [Mission](#mission)
1. [Quickstart Guide](./docs/quickstart.md)
1. [API](./docs/api.md)
1. [TypeScript Support](#typescript-support)
1. [Alternatives](#alternatives)
1. [Developing](#developing)

## Features

1. Simple one-off [setup](./docs.quickstart.md) for native projects
1. Access from [javascript](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#javascript)
1. Access from native code: [java](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#java) and [objective-c](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#objective-c)
1. Access in build tools: [xcode](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#infoplist), [gradle](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#buildgradle) and [AndroidManifest.xml](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#androidmanifestxml)
1. Unit tested
1. E2E tested
1. Provides typescript typings
1. Supports [dotenv and yaml](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#files)
1. [Fully typed](https://github.com/maxkomarychev/react-native-ultimate-config/blob/master/docs/api.md#note-about-types) values available when using yaml config

## Mission

React-Native brings together 3 platforms: ios, android, javascript each of
which have different conventions and approaches how to manage environment
settings.

react-native-ultimate-config exposes configuration from env files to all
levels of the projects:

1. javascript
1. native code
   - java
   - objective-c
1. native build configuration
   - ios
     - build settings
     - infoplist
   - android
     - build config
     - string resources
     - project.ext

```
|-------------------------------------------------------|
|                                                       |
|                     javascript                        |
|                                                       |
|-------------------------------------------------------|
|                          |                            |
|       objective-c        |           java             |
|                          |                            |
|-------------------------------------------------------|
|                          |                            |
|      build settings      |     AndroidManifest.xml    |
|         infoplist        |        build.gradle        |
|                          |                            |
|-------------------------------------------------------|
```

react-native-ultimate-config offers a way to configure your projects on all
levels and keep configuration data separate from code or project files:
api urls, app names, feature flags.
Anything you would typically put into environment can now be loaded from a
separate file.

After trivial one-time setup of native projects exposing environment to the
app happens with a single command.

## TypeScript Support

`index.d.ts` is generated dynamically according to variables defined in envfile

## Alternatives

| project                                                                 | comparison                                                                 |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [react-native-dotenv](https://github.com/zetachang/react-native-dotenv) | Javascript only. Does not allow to configure native counterpart of the app |
| [react-native-config](https://github.com/luggit/react-native-config)    | Allows configuring native and javascript                                   |

## Developing

### Misc

Files

```
android/src/main/java/com/reactnativeultimateconfig/ConfigValues.java
ios/ConfigValues.h
```

are updated with every `rnuc` execution, yet they have to exist in the repo.

In order to avoid committing them accidentally run

```bash
git update-index --assume-unchanged android/src/main/java/com/reactnativeultimateconfig/ConfigValues.java ios/ConfigValues.h
```

When changing them turn the flag off, update, commit, turn flag back on.
More details: https://git-scm.com/docs/git-update-index#_using_assume_unchanged_bit

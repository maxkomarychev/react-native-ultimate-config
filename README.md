# react-native-ultimate-config

_Configure all levels of your react-native app with a single file_

This library exposes configuration from env files to all levels of the projects:

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


## Table of contents

1. [Mission](#mission)
1. [Quickstart Guide](./docs/quickstart.md)
1. [API](./docs/api.md)
1. [Competitors](#competitors)


## Mission

React-Native brings together 3 platforms: ios, android, javascript each of
which have different conventions and approaches how to manage environment
settings. 

react-native-ultimate-config offers a unified way to configure your projects
and keep configuration data separate from code or project files: api urls, 
app names, feature flags. Anything you would typically put into environment.

Consumption of the environment should be happening with explicit command 
without too much magic and complex integration steps.

## Competitors


| project | comparison |
|-|-|
|[react-native-config](https://github.com/luggit/react-native-config) | Allows configuring native and javascript but project seems to be abandoned.|
|[react-native-dotenv](https://github.com/zetachang/react-native-dotenv) | Javascript only. Does not allow configure native counterpart of the app.|

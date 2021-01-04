# API

Table of contents

1. [Files](#files)
1. [CLI](#cli)
   1. [Advanced options for monorepo](#advanced-options-for-monorepo)
   1. [RC file](#rc-file)
      1. [Hooks](#hooks)
      1. [JS override](#js-override)
1. [Javascript](#javascript)
1. [Typescript](#typescript)
1. [ios](#ios)
   1. [Build settings](#build-settings)
   1. [Info.plist](#infoplist)
   1. [Objective-C](#objective-c)
1. [Android](#android)
   1. [build.gradle](#buildgradle)
   1. [AndroidManifest.xml](#androidmanifestxml)
   1. [Java](#java)
1. [Note about types](#note-about-types)

## Files

Environment data can be read from both dotenv and YAML files. Latter are automaticlaly detected by CLI based on extension: `.yaml` or `.yml`.

Example of configuration in env file:

```
HELLO=world
TEST=100
```

Equivalent config with YAML:

```yaml
HELLO: world
TEST: 100
```

### Per platform values

When using YAML it is possible to specify values per platform:

```yaml
HELLO: world
TEST: 100
API_KEY:
  ios: abcdef
  android: tuvxyz
```

☝ both keys must exist in the mapping

## CLI

Inject environment data with a single command:

| npm                  | yarn             |
| -------------------- | ---------------- |
| `npm yarn rnuc .env` | `yarn rnuc .env` |

### Advanced options for monorepo

1. `--project-root`: path to the root of the project for which injection is performed
1. `--lib-root`: path to where library is installed

Considering typical monorepo folder structure:

```
- node_modules
   - react-native-ultimate-config
- packages
   - my_app
```

When injecting config for `my_app` the command should be:

```bash
yarn rnuc --project-root . --lib-root ../../node_modules/react-native-ultimate-config .env
```

## RC file

### Hooks

When file `.rnucrc.js` exists in project root it will be loaded when
`rnuc` CLI is executed. A single function `on_env` will be invoked with env
data loaded from the file. Object returned from the function will be used
instead of original env data. When function returns `undefined` original data
will be used.

```js
module.exports = {
  on_env: async function (env) {
    // this will be invoked with data of loaded env file
  },
};
```

### JS override

When rc file contains boolean field `js_override` `react-native-ultimate-config` will generate js code overriding values passed from native code. [Scenarios why this may be needed](./cookbook.md#override-native-values-in-js)

```js
module.exports = {
  js_override: true,
};
```

## Javascript

Get your values in javascript!

```javascript
// import module
import config from "react-native-ultimate-config";

// access variables
config.MY_CONFIG;
```

## Typescript

`index.d.ts` file is generated according to consumed environment

## ios

### Build settings

All values from env file are exposed to Build Settings.

### Info.plist

All values from env file are exposed to Build Settings and therefore
automatically available in info plist.

Example: set app name from config

env file:

```env
APP_NAME=example
```

update info plist and observe app name changed:

![update app name](./api.assets/ios.info.1.png)
![update app name](./api.assets/ios.info.2.png)

### Objective-c

```objc
#import <react-native-ultimate-config/ConfigValues.h>
...
NSLog(APP_NAME);
```

## Android

Gradle plugin of a library injects environment variables into as:

1. `BuildConfig` entries
1. stirng resources
1. `project.ext.env` of `build.gradle`

### build.gradle

you can access config variales with simple

```gradle
project.config.get("APP_NAME")
```

### AndroidManifest.xml

All values from environment are made available as resources and [manifest placeholders](https://developer.android.com/studio/build/manifest-build-variables)

They are accessible as:

#### a string resource

```xml
      <activity
        ...
        android:label="@string/APP_NAME"
        />
        ...
      </activity>
```

#### a placeholder variable

```xml
      <activity
        ...
        android:label="${APP_NAME}"
        />
        ...
      </activity>
```

### Java

All variables are exposed via `BuilConfig`. They are accessible as:

```java
package com.example;

import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "example";
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Log.d("onCreate", BuildConfig.APP_NAME);
  }

}

```

## Note about types

If yaml file is used for configuration then it is possible to pick up types of variables, however not every place can deal with all types or deal with types at all. Please consult with the following table to know what's available:

| place               | types available | notes                                                                                                                                                                                    |
| ------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| javascript          | yes             | -                                                                                                                                                                                        |
| infoplist           | no              | -                                                                                                                                                                                        |
| objective-c         | yes             | -                                                                                                                                                                                        |
| build.gradle        | yes             | -                                                                                                                                                                                        |
| AndroidManifest.xml | yes\*           | floating point values are available as `@string` resources since there are no such type available in resources: https://developer.android.com/guide/topics/resources/available-resources |
| Java                | yes             | -                                                                                                                                                                                        |

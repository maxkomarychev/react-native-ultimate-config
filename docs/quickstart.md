# Quickstart

1. Add dependency

    `yarn add react-native-ultimate-config`

1. Create example file

    ```bash
    echo "MY_CONFIG=hello" > .env
    ```

1. Update .gitignore

    Add this to `.gitignore`:

    ```
    # react-native-ultimate-config
    rnuc.xcconfig
    rnuc.properties
    ```

1. Generate files

    Create script for executable in your `package.json`

    ```json
    "scripts": {
        "setenv": "./node_modules/react-native-ultimate-config/bin.js"
    }
    ```

    generate env files for navite projects

    ```bash
    yarn setenv .env
    ```

1. Configure navite projects

    1. ios

        1. open workspace
        1. open Finder in folder `ios`
        1. drag'n'drop generated file into project
            ![drag and drop](./quickstart.assets/ios.1.png)
            ![drag and drop](./quickstart.assets/ios.2.png)
        1. go to project settings
        1. set `rnuc.config` as root configuration for both "Debug" and "Release"
            ![set](./quickstart.assets/ios.3.png)

    1. android

        Add this right after applying react's plugin:

        ```gradle
        apply from: "../../node_modules/react-native-ultimate-config/android/rnuc.gradle"
        ```

        Final code: 

        ```gradle
        apply from: "../../node_modules/react-native/react.gradle"
        apply from: "../../node_modules/react-native-ultimate-config/android/rnuc.gradle"
        ````

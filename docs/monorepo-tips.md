# Monorepo tips


When using rnuc for a project which is a part of monorepo the following things
can some handy:


1. [Monorepo support in CLI](./api.md#advanced-options-for-monorepo)
2. Specifying path to react-native
`build.gradle` will try to find path to a folder with `react-native` which 
maybe quite problematic with monorepo.
If this is true you need to specify path to react-native yourself using this
snipped in your root `build.gradle`:

    ```groovy
    buildscript {
        ext {
            REACT_NATIVE_NODE_MODULES_DIR = "<prefix>/node_modules/react-native"
        }
    }
    ```

    where `<prefix>` are several `../` depending on how your repo is structured.
    Normally this should be only two `../../` if you have the following layout
    of packages:
    
    ```
    |-- package.json
    |-- node_modules
        |-- react-native-ultimate-config
    |-- packages
        |-- my_app
        |-- package1
        |-- package2
        |-- packageN
    ```
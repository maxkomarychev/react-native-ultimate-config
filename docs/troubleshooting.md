# Troubleshooting

This document covers common errors and pitfalls when implementing the library in a project.

## Build fails on missing config files

After following the steps in the [quickstart guide](./quickstart.md) your builds depend on the generated config files. When these files are missing, you may see build errors like:

> yaml file at path /X/Y/node_modules/react-native-ultimate-config/android/rnuc.yaml does not exist

Or

> /X/Y/node_modules/react-native-ultimate-config/ios/ConfigValues.h:1:2: error: "invoke bin.js with env file before compiling native project"

When this happens, all you need to do is trigger the script that generates the required config files:

```bash
yarn rnuc <env file>
```

☝️ Note that the generated config files are not persistent in your codebase (and they should not be). This can lead to builds failing when:

- Cleaning your local working directory (e.g. when re-installing node-modules).
- Initiating the project on a new machine.
- Building the project on a CI server.

To prevent this, simply add the `yarn rnuc <env file>` command in your workflow before building.

### 🧹 Example: cleaning your local working directory

```json
// package.json

{
  "scripts": {
    "clean": "rm -rf node_modules && yarn && yarn rnuc <env file>"
  }
}
```

### 🤖 Example: building the project on AppCenter

AppCenter allows you to customize your builds by adding [build scripts](https://docs.microsoft.com/en-us/appcenter/build/custom/scripts/). When configured we can use the post-clone script to generate the config files before the app is built:

```sh
# appcenter-post-clone.sh

echo "Installing yarn dependencies..."
yarn install

echo "Generating config files..."
yarn rnuc <env file>
```

Other Build/CI services will have different approaches, but the concept is the same: make sure the config files are generated _before_ the build step.

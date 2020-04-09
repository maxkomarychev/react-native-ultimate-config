const cp = require("child_process")
const fs = require('fs')
const path = require('path')

const files_to_assert = {
    "android/app/rnuc.properties": `# DO NOT COMMIT OR EDIT THIS FILE
MY_VARIABLE=hello
`,
    "ios/rnuc.xcconfig":`// DO NOT COMMIT OR EDIT THIS FILE
MY_VARIABLE=hello
`,
    "node_modules/react-native-ultimate-config/ios/ConfigValues.h":`// DO NOT COMMIT OR EDIT THIS FILE
#define MY_VARIABLE @"hello"

static NSDictionary *getValues() {
    return @{
        @"MY_VARIABLE": MY_VARIABLE,
    };
}`,
    "node_modules/react-native-ultimate-config/android/src/main/java/com/reactnativeultimateconfig/ConfigValues.java":`// DO NOT COMMIT OR EDIT THIS FILE
package com.reactnativeultimateconfig;
import java.util.*;

class ConfigValues {
  public static Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("MY_VARIABLE", "hello");
    return constants;
  }
}
`,
    "node_modules/react-native-ultimate-config/index.d.ts": `// DO NOT COMMIT OR EDIT THIS FILE
declare module 'react-native-ultimate-config' {
    export interface ConfigVariables {
        MY_VARIABLE: string
    }

    export default ConfigVariables;
}
`
}

describe("test codegen", () => {
    let project_root
    beforeEach(() => {
        project_root= fs.mkdtempSync("rnuc-jest")
    })
    afterEach(() => {
        fs.rmdirSync(project_root, { recursive: true })
    })
    it("creates files at paths", () => {
        console.log(project_root)
        fs.writeFileSync(path.join(project_root, ".env"), "MY_VARIABLE=hello")
        const project_ios = path.join(project_root, "ios")
        const project_android= path.join(project_root, "android", "app")
        const lib_root = path.join(project_root, "node_modules", "react-native-ultimate-config")
        const lib_install = path.join(lib_root, "ios")
        const lib_install_ios = path.join(lib_root, "ios")
        const lib_install_android = path.join(lib_root, "android/src/main/java/com/reactnativeultimateconfig")
        fs.mkdirSync(project_ios, {recursive: true})
        fs.mkdirSync(lib_install, { recursive: true })
        fs.mkdirSync(lib_install_ios, { recursive: true })
        fs.mkdirSync(lib_install_android, { recursive: true })
        fs.mkdirSync(project_android, { recursive: true })
        cp.execFileSync(
            path.join(process.cwd(), "bin.js"),
            [".env"],
            { cwd: project_root}
        )
        for (const file in files_to_assert) {
            const file_path = path.join(project_root, file)
            expect(fs.existsSync(file_path)).toEqual(true)
            expect(fs.readFileSync(file_path).toString()).toEqual(files_to_assert[file])
        }
     })
})

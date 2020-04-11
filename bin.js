#!/usr/bin/env node

const yargs = require('yargs')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const warning_text = 'DO NOT COMMIT OR EDIT THIS FILE'

const objc_header_template = `// ${warning_text}
{{#each @root}}
#define {{@key}} @"{{{this}}}"
{{/each}}

static NSDictionary *getValues() {
    return @{
        {{#each @root}}
        @"{{@key}}": {{@key}},
        {{/each}}
    };
}`

const xcconfig_template = `// ${warning_text}
{{#each @root}}
{{@key}}={{{this}}}
{{/each}}
`

const properties_template = `# ${warning_text}
{{#each @root}}
{{@key}}={{{this}}}
{{/each}}
`

const java_template = `// ${warning_text}
package com.reactnativeultimateconfig;
import java.util.*;

class ConfigValues {
  public static Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
{{#each @root}}
    constants.put("{{@key}}", "{{{this}}}");
{{/each}}
    return constants;
  }
}
`

const index_d_ts_template = `// ${warning_text}
export interface ConfigVariables {
{{#each @root}}
    {{@key}}: string
{{/each}}
}

declare const UltimateConfig: ConfigVariables

export default UltimateConfig
`

const env_file = yargs.argv._[0]
const env_data = dotenv.parse(fs.readFileSync(env_file))
const project_root = process.cwd()
const lib_root = path.join(project_root, "node_modules","react-native-ultimate-config")

function write_template(template_string, output_path, data) {
    const parsed_template = handlebars.compile(template_string)
    const rendered = parsed_template(data)
    console.log("WRITING FILE", output_path)
    console.log(rendered)
    fs.writeFileSync(output_path, rendered)
}

const code_file_name = "ConfigValues"
const config_file_name = "rnuc"

write_template(
    objc_header_template,
    path.join(lib_root, "ios", `${code_file_name}.h`),
    env_data
)

write_template(
    xcconfig_template,
    path.join(project_root, "ios", `${config_file_name}.xcconfig`),
    env_data
)

write_template(
    java_template,
    path.join(lib_root, "android", `src/main/java/com/reactnativeultimateconfig/${code_file_name}.java`),
    env_data
)

write_template(
    properties_template,
    path.join(project_root, `android/app/${config_file_name}.properties`),
    env_data
)

write_template(
    index_d_ts_template,
    path.join(lib_root, "index.d.ts"),
    env_data
)

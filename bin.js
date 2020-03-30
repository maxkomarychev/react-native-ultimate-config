#!/usr/bin/env node

const yargs = require('yargs')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

const objc_header_template = `{{#each @root}}
#define {{@key}} @"{{this}}"
{{/each}}

static NSDictionary *getValues() {
    return @{
        {{#each @root}}
        @"{{@key}}": {{@key}},
        {{/each}}
    };
}`

const xcconfig_template = `{{#each @root}}
{{@key}}={{this}}
{{/each}}
`

const properties_template = xcconfig_template

const java_template = `
package com.reactnativeultimateconfig;
import java.util.*;

class ConfigValues {
  public static Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
{{#each @root}}
    constants.put("{{@key}}", "{{this}}");
{{/each}}
    return constants;
  }
}
`

const env_file = yargs.argv._[0]
const env_data = dotenv.parse(fs.readFileSync(env_file))
const cwd = process.cwd()
const lib_root = path.join(cwd, "node_modules","react-native-ultimate-config")

function write_template(template_string, output_path, data) {
    const parsed_template = handlebars.compile(template_string)
    fs.writeFileSync(output_path, parsed_template(data))
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
    path.join(process.cwd(), "ios", `${config_file_name}.xcconfig`),
    env_data
)

write_template(
    java_template,
    path.join(lib_root, "android", `src/main/java/com/reactnativeultimateconfig/${code_file_name}.java`),
    env_data
)

write_template(
    properties_template,
    path.join(process.cwd(), `android/app/${config_file_name}.properties`),
    env_data
)

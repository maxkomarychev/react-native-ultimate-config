const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");

const code_file_name = "ConfigValues";
const config_file_name = "rnuc";

function is_string(value) {
  return typeof value === "string";
}

function is_number(value) {
  return typeof value === "number";
}

function is_boolean(value) {
  return typeof value === "boolean";
}

function escape(value) {
  if (is_string(value)) {
    return value.replace(/"/gm, '\\"');
  } else {
    return value;
  }
}

function xcconfig_format(value) {
  if (is_string(value)) {
    return value.replace(/\/\//gm, "/$()/");
  } else {
    return value;
  }
}

function to_json(value) {
  return JSON.stringify(value, null, 2);
}

function render_template(template_name, data) {
  const template_path = path.join(
    __dirname,
    "templates",
    `${template_name}.handlebars`
  );
  const template_string = fs.readFileSync(template_path).toString();
  handlebars.registerHelper("isBoolean", is_boolean);
  handlebars.registerHelper("isString", is_string);
  handlebars.registerHelper("isNumber", is_number);
  handlebars.registerHelper("escape", escape);
  handlebars.registerHelper("xcconfigFormat", xcconfig_format);
  handlebars.registerHelper("toJSON", to_json);
  const parsed_template = handlebars.compile(template_string);
  const rendered = parsed_template(data);
  return rendered;
}

module.exports = function render_env(project_root, lib_root, env, rc) {
  const { ios, android, web } = env;
  const map = {
    [path.join(lib_root, "index.d.ts")]: render_template("index.d.ts", ios),
    [path.join(lib_root, "index.web.js")]: render_template("index.web.js", web),
    [path.join(lib_root, "ios", `${code_file_name}.h`)]: render_template(
      "ConfigValues.h",
      ios
    ),
    [path.join(lib_root, "android", `rnuc.yaml`)]: render_template(
      "rnuc.yaml",
      android
    ),
  };
  // Only save xcconfig if the project contains an ios folder. All react-native
  // apps will contain this folder, but some react-native-web apps may not.
  if (fs.existsSync(path.join(project_root, "ios"))) {
    map[path.join(project_root, "ios", `${config_file_name}.xcconfig`)] =
      render_template("rnuc.xcconfig", ios)
  }
  if (rc && typeof rc.js_override === "boolean" && rc.js_override) {
    map[path.join(lib_root, "override.js")] = render_template("override.js", {
      ios,
      android,
    });
  } else {
    map[path.join(lib_root, "override.js")] = render_template("override.js", {
      ios: {},
      android: {},
    });
  }
  return map;
};

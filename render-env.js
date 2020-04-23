const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");

const code_file_name = "ConfigValues";
const config_file_name = "rnuc";

function render_template(template_name, data) {
  const template_path = path.join(
    __dirname,
    "templates",
    `${template_name}.handlebars`
  );
  const template_string = fs.readFileSync(template_path).toString();
  const parsed_template = handlebars.compile(template_string);
  const rendered = parsed_template(data);
  return rendered;
}

function render_env(project_root, lib_root, env) {
  const map = {
    [path.join(lib_root, "index.d.ts")]: render_template("index.d.ts", env),
    [path.join(lib_root, "ios", `${code_file_name}.h`)]: render_template(
      "ConfigValues.h",
      env
    ),
    [path.join(
      lib_root,
      "android",
      `src/main/java/com/reactnativeultimateconfig/${code_file_name}.java`
    )]: render_template("ConfigValues.java", env),
    [path.join(lib_root, "android", `rnuc.yaml`)]: render_template(
      "rnuc.yaml",
      env
    ),
    [path.join(
      project_root,
      "ios",
      `${config_file_name}.xcconfig`
    )]: render_template("rnuc.xcconfig", env),
  };
  return map;
}

module.exports = render_env;

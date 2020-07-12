const load_env = require("./load-env");
const render_env = require("./render-env");
const write_env = require("./write-env");
const flatten = require("./flatten");

module.exports = function (project_root, lib_root, env_file) {
  const env = load_env(env_file);
  const flat = {
    ios: flatten(env, "ios"),
    android: flatten(env, "android"),
  };
  const files_to_write = render_env(project_root, lib_root, flat);
  write_env(files_to_write);
};

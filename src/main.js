const load_env = require("./load-env");
const render_env = require("./render-env");
const write_env = require("./write-env");

module.exports = function (project_root, lib_root, env_file) {
  const env = load_env(env_file);
  const files_to_write = render_env(project_root, lib_root, env);
  write_env(files_to_write);
};

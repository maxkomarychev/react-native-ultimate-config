const load_env = require("./load-env");
const render_env = require("./render-env");
const write_env = require("./write-env");
const flatten = require("./flatten");

async function resolve_env(env, rc) {
  if (rc && rc.on_env) {
    const patched_env = await rc.on_env(env);
    return patched_env || env;
  } else {
    return env;
  }
}

module.exports = async function (project_root, lib_root, env_file, rc) {
  const env = await resolve_env(load_env(env_file), rc);
  const flat = {
    ios: flatten(env, "ios"),
    android: flatten(env, "android"),
  };
  const files_to_write = render_env(project_root, lib_root, flat);
  write_env(files_to_write);
};

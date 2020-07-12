module.exports = async function resolve_env(env, rc) {
  if (rc && rc.on_env) {
    const patched_env = await rc.on_env(env);
    return typeof patched_env === "undefined" ? env : patched_env;
  } else {
    return env;
  }
};

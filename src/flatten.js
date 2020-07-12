const assert = require("assert");

module.exports = function (config, platform) {
  assert(
    config && typeof config === "object",
    "Config should be non-null object"
  );
  assert(
    platform === "ios" || platform === "android",
    "`platform` should either be 'ios' or 'android'"
  );
  const result = {};
  for (const key in config) {
    const value = config[key];
    if (value && typeof value === "object") {
      result[key] = value[platform];
    } else {
      result[key] = value;
    }
  }
  return result;
};

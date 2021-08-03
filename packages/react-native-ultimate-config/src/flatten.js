const assert = require("assert");

const VALID_PLATFORMS = ["ios", "android", "web"];

module.exports = function (config, platform) {
  assert(
    config && typeof config === "object",
    "Config should be non-null object"
  );
  assert(
    VALID_PLATFORMS.includes(platform),
    "`platform` should one of: " + VALID_PLATFORMS.join(", ")
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

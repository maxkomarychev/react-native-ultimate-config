module.exports = function (config, platform) {
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

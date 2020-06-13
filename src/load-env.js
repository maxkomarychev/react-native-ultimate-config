const dotenv = require("dotenv");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

module.exports = function (config_path) {
  const { ext } = path.parse(config_path);
  if (ext === ".yml" || ext === ".yaml") {
    const data = fs.readFileSync(config_path).toString();
    return yaml.safeLoad(data) || {};
  } else {
    const data = dotenv.config({ path: config_path });
    return data.parsed || {};
  }
};

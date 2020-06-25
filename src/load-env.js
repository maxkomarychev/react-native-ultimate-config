const dotenv = require("dotenv");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

function read(config_path) {
  const { ext } = path.parse(config_path);
  if (ext === ".yml" || ext === ".yaml") {
    const data = fs.readFileSync(config_path).toString();
    return yaml.safeLoad(data);
  } else {
    const data = dotenv.config({ path: config_path });
    return data.parsed;
  }
}

module.exports = function (config_path) {
  const data = read(config_path);
  if (
    typeof data === "undefined" ||
    data === null ||
    typeof data !== "object"
  ) {
    throw new Error(
      `Expected to read object from ${config_path}, but got '${data}'`
    );
  }
  return data;
};

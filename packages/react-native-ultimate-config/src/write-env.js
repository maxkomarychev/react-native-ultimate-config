const fs = require("fs");

module.exports = function (env) {
  for (const path in env) {
    fs.writeFileSync(path, env[path]);
  }
};

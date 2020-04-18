const fs = require("fs");

function write_env(env) {
  for (const path in env) {
    fs.writeFileSync(path, env[path]);
  }
}
module.exports = write_env;

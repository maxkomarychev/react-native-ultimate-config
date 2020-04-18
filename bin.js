#!/usr/bin/env node

const yargs = require("yargs");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const load_env = require("./load-env");
const render_env = require("./render-env");
const add_types = require("./add-types");
const write_env = require("./write-env");

function main(project_root, lib_root, env_file) {
  const env = load_env(env_file);
  const with_types = add_types(env);
  const files_to_write = render_env(project_root, lib_root, with_types);
  write_env(files_to_write);
}
if (require.main === module) {
  yargs.default("projectRoot", process.cwd());
  const project_root = yargs.argv.projectRoot;
  yargs.default(
    "libRoot",
    path.join(project_root, "node_modules", "react-native-ultimate-config")
  );
  const lib_root = yargs.argv.libRoot;

  const env_file = yargs.argv._[0];

  main(project_root, lib_root, env_file);
}

module.exports = main;

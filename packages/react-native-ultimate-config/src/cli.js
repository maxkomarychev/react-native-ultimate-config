#!/usr/bin/env node

const yargs = require("yargs");
const path = require("path");
const main = require("./main");

module.exports = function () {
  yargs.default("projectRoot", process.cwd());
  const project_root = yargs.argv.projectRoot;
  yargs.default(
    "libRoot",
    path.join(project_root, "node_modules", "react-native-ultimate-config")
  );
  const lib_root = yargs.argv.libRoot;

  const env_file = yargs.argv._[0];

  main(project_root, lib_root, env_file);
};

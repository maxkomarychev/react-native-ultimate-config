#!/usr/bin/env node

const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const main = require("./main");

module.exports = async function () {
  yargs.default("projectRoot", process.cwd());
  const project_root = yargs.argv.projectRoot;
  yargs.default(
    "libRoot",
    path.join(project_root, "node_modules", "react-native-ultimate-config")
  );
  const lib_root = yargs.argv.libRoot;

  const env_file = yargs.argv._[0];

  const abc = path.resolve(project_root, ".rnucrc.js");
  if (fs.existsSync(abc)) {
    const rc = require(abc);
    await main(project_root, lib_root, env_file, rc);
  } else {
    await main(project_root, lib_root, env_file);
  }
};

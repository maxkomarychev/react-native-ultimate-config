#!/usr/bin/env node

const yargs = require("yargs");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const render_env = require("./render-env");

yargs.default("projectRoot", process.cwd());
const project_root = yargs.argv.projectRoot;
yargs.default(
  "libRoot",
  path.join(project_root, "node_modules", "react-native-ultimate-config")
);
const lib_root = yargs.argv.libRoot;
const env_file = yargs.argv._[0];
const env_data = dotenv.parse(fs.readFileSync(env_file));

const files_to_write = render_env(project_root, lib_root, env_data);

for (const file_path of Object.keys(files_to_write)) {
  console.log("writing", file_path);
  fs.writeFileSync(file_path, files_to_write[file_path]);
}

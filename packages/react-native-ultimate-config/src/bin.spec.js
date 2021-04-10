const cp = require("child_process");
const fs = require("fs");
const path = require("path");
const { files_to_assert } = require("./main.spec");

describe.each`
  extension  | env_test_content
  ${""}      | ${"hello=world"}
  ${".yaml"} | ${"hello: world"}
  ${".yml"}  | ${"hello: world"}
`("test codegen", ({ extension, env_test_content }) => {
  let project_root;
  beforeAll(() => {
    project_root = path.join(process.cwd(), fs.mkdtempSync("rnuc-jest"));
    for (const file_path of files_to_assert) {
      const { dir } = path.parse(file_path);
      const folder = path.join(project_root, dir);
      fs.mkdirSync(folder, { recursive: true });
    }
  });
  afterAll(() => {
    fs.rmdirSync(project_root, { recursive: true });
  });
  it.each(files_to_assert.map((k) => [k]))(
    "creates file at path %s",
    (file_path) => {
      const env_file_path = path.join(project_root, `.env${extension}`);
      fs.writeFileSync(env_file_path, env_test_content);
      cp.execFileSync(path.join(process.cwd(), "bin.js"), [env_file_path], {
        cwd: project_root,
      });
      expect(fs.existsSync(path.join(project_root, file_path))).toEqual(true);
    }
  );
});

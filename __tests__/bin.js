const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const mock_load_env = jest.fn();
jest.doMock("../load-env", () => mock_load_env);
const mock_render_env = jest.fn();
jest.doMock("../render-env", () => mock_render_env);
const mock_add_types = jest.fn();
jest.doMock("../add-types", () => mock_add_types);
const mock_write_env = jest.fn();
jest.doMock("../write-env", () => mock_write_env);

const main = require("../bin");

const env_test_content = ``;

const files_to_assert = [
  "ios/rnuc.xcconfig",
  "node_modules/react-native-ultimate-config/ios/ConfigValues.h",
  "node_modules/react-native-ultimate-config/android/src/main/java/com/reactnativeultimateconfig/ConfigValues.java",
  "node_modules/react-native-ultimate-config/android/rnuc.yaml",
  "node_modules/react-native-ultimate-config/index.d.ts",
];

describe.each`
  extension
  ${""}
  ${".yaml"}
  ${".yml"}
`("test codegen", ({ extension }) => {
  let project_root;
  beforeAll(() => {
    project_root = fs.mkdtempSync("rnuc-jest");
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
      fs.writeFileSync(
        path.join(project_root, `.env${extension}`),
        env_test_content
      );
      cp.execFileSync(path.join(process.cwd(), "bin.js"), [".env"], {
        cwd: project_root,
      });
      expect(fs.existsSync(path.join(project_root, file_path))).toEqual(true);
    }
  );
});

describe("main", () => {
  it("execute render with paths", () => {
    const mock_writeFileSync = jest.fn();
    jest.doMock("fs", () => ({ writeFileSync: mock_writeFileSync }));
    mock_load_env.mockReturnValueOnce({ data: true });
    mock_add_types.mockReturnValueOnce({ with: "types" });
    mock_render_env.mockReturnValueOnce({ hello: "world" });
    main(
      "project",
      "project/node_modules/react-native-ultimate-config",
      "file"
    );
    expect(mock_load_env).toHaveBeenCalledWith("file");
    expect(mock_add_types).toHaveBeenCalledWith({ data: true });
    expect(mock_render_env).toHaveBeenCalledWith(
      "project",
      "project/node_modules/react-native-ultimate-config",
      { with: "types" }
    );
    expect(mock_write_env).toHaveBeenCalledWith({ hello: "world" });
  });
});

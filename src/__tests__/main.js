const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const mock_load_env = jest.fn();
jest.doMock("../load-env", () => mock_load_env);
const mock_render_env = jest.fn();
jest.doMock("../render-env", () => mock_render_env);
const mock_write_env = jest.fn();
jest.doMock("../write-env", () => mock_write_env);
const mock_flatten = jest.fn();
jest.doMock("../flatten", () => mock_flatten);

const main = require("../main");

const files_to_assert = [
  "ios/rnuc.xcconfig",
  "node_modules/react-native-ultimate-config/ios/ConfigValues.h",
  "node_modules/react-native-ultimate-config/android/rnuc.yaml",
  "node_modules/react-native-ultimate-config/index.d.ts",
];

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

describe("main", () => {
  it("execute render with paths", () => {
    const mock_writeFileSync = jest.fn();
    jest.doMock("fs", () => ({ writeFileSync: mock_writeFileSync }));
    mock_load_env.mockReturnValueOnce({ data: true });
    mock_flatten.mockReturnValueOnce({ data: true, ios: true });
    mock_flatten.mockReturnValueOnce({ data: true, android: true });
    mock_render_env.mockReturnValueOnce({ hello: "world" });
    main(
      "project",
      "project/node_modules/react-native-ultimate-config",
      "file"
    );
    expect(mock_load_env).toHaveBeenCalledWith("file");
    expect(mock_flatten).toHaveBeenCalledWith({ data: true }, "ios");
    expect(mock_flatten).toHaveBeenCalledWith({ data: true }, "android");
    expect(mock_render_env).toHaveBeenCalledWith(
      "project",
      "project/node_modules/react-native-ultimate-config",
      {
        ios: { data: true, ios: true },
        android: { data: true, android: true },
      }
    );
    expect(mock_write_env).toHaveBeenCalledWith({ hello: "world" });
  });
  describe.only("rc.on_env", () => {
    it("invoke rc hook with config before flattening", () => {
      const on_env = jest.fn();
      // const mock_writeFileSync = jest.fn();
      // jest.doMock("fs", () => ({ writeFileSync: mock_writeFileSync }));
      mock_load_env.mockReturnValueOnce({ data: true });
      // mock_flatten.mockReturnValueOnce({ data: true, ios: true });
      // mock_flatten.mockReturnValueOnce({ data: true, android: true });
      // mock_render_env.mockReturnValueOnce({ hello: "world" });
      main(
        "project",
        "project/node_modules/react-native-ultimate-config",
        "file",
        { on_env }
      );
      expect(on_env).toHaveBeenCalledWith({ data: true });
      // expect(mock_load_env).toHaveBeenCalledWith("file");
      expect(mock_flatten).toHaveBeenCalledWith({ data: true }, "ios");
      expect(mock_flatten).toHaveBeenCalledWith({ data: true }, "android");
      // expect(mock_render_env).toHaveBeenCalledWith(
      //   "project",
      //   "project/node_modules/react-native-ultimate-config",
      //   {
      //     ios: { data: true, ios: true },
      //     android: { data: true, android: true },
      //   }
      // );
      // expect(mock_write_env).toHaveBeenCalledWith({ hello: "world" });
    });
    it("hook can add or remove values", () => {
      const on_env = jest.fn();
      on_env.mockImplementation((env) => {
        const { key1, ...rest } = env;
        // delete env.key1;
        // env.key2 = "hello";
        return {
          ...rest,
          key2: "hello",
        };
      });
      // const mock_writeFileSync = jest.fn();
      // jest.doMock("fs", () => ({ writeFileSync: mock_writeFileSync }));
      mock_load_env.mockReturnValueOnce({ data: true, key1: "bye" });
      // mock_flatten.mockReturnValueOnce({ data: true, ios: true });
      // mock_flatten.mockReturnValueOnce({ data: true, android: true });
      // mock_render_env.mockReturnValueOnce({ hello: "world" });
      main(
        "project",
        "project/node_modules/react-native-ultimate-config",
        "file",
        { on_env }
      );
      expect(on_env).toHaveBeenCalledWith({ data: true, key1: "bye" });
      // expect(mock_load_env).toHaveBeenCalledWith("file");
      expect(mock_flatten).toHaveBeenCalledWith(
        { data: true, key2: "hello" },
        "ios"
      );
      expect(mock_flatten).toHaveBeenCalledWith(
        { data: true, key2: "hello" },
        "android"
      );
      // expect(mock_render_env).toHaveBeenCalledWith(
      //   "project",
      //   "project/node_modules/react-native-ultimate-config",
      //   {
      //     ios: { data: true, ios: true },
      //     android: { data: true, android: true },
      //   }
      // );
      // expect(mock_write_env).toHaveBeenCalledWith({ hello: "world" });
    });
  });
});

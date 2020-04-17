const cp = require("child_process");
const fs = require("fs");
const path = require("path");

const env_test_content = ``;

const files_to_assert = [
  "android/app/rnuc.properties",
  "ios/rnuc.xcconfig",
  "node_modules/react-native-ultimate-config/ios/ConfigValues.h",
  "node_modules/react-native-ultimate-config/android/src/main/java/com/reactnativeultimateconfig/ConfigValues.java",
  "node_modules/react-native-ultimate-config/index.d.ts",
];

describe("test codegen", () => {
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
      fs.writeFileSync(path.join(project_root, ".env"), env_test_content);
      cp.execFileSync(path.join(process.cwd(), "bin.js"), [".env"], {
        cwd: project_root,
      });
      expect(fs.existsSync(path.join(project_root, file_path))).toEqual(true);
    }
  );
});

const fs = require("fs");
const path = require("path");

const render_env = require("../render-env");

const PROJECT_ROOT = "/home/user1/my_project";
const LIB_ROOT =
  "/home/user1/my_project/node_modules/react-native-ultimate-config";
const D_TS_FILE = `${LIB_ROOT}/index.d.ts`;
const GRADLE_YAML_PATH = `${LIB_ROOT}/android/rnuc.yaml`;
const H_VALUES_FILE = `${LIB_ROOT}/ios/ConfigValues.h`;
const XCCONFIG_FILE = `${PROJECT_ROOT}/ios/rnuc.xcconfig`;
describe("render_env", () => {
  let map = undefined;
  beforeEach(() => {
    map = render_env(PROJECT_ROOT, LIB_ROOT, {
      MY_VARIABLE: "hello",
      MY_URL: "http://hello.world?howareyoudoing=ok",
      MY_STRING: "string_value",
      MY_NUMBER: 42,
      MY_BOOLEAN: true,
      MY_BOOLEAN_FALSE: false,
      PER_PLATFORM: { ios: "hello", android: "world" },
    });
  });

  it("returns map of files to write against specifed roots", () => {
    const paths = Object.keys(map);
    expect(paths.includes(D_TS_FILE)).toEqual(true);
    expect(paths.includes(GRADLE_YAML_PATH)).toEqual(true);
    expect(paths.includes(H_VALUES_FILE)).toEqual(true);
    expect(paths.includes(XCCONFIG_FILE)).toEqual(true);
  });
  it.each`
    expected_path       | test_file
    ${D_TS_FILE}        | ${"index.d.ts"}
    ${GRADLE_YAML_PATH} | ${"rnuc.yaml"}
    ${H_VALUES_FILE}    | ${"ConfigValues.h"}
    ${XCCONFIG_FILE}    | ${"rnuc.xcconfig"}
  `("correct data for file $expected_path", ({ expected_path, test_file }) => {
    const data_path = path.join(__dirname, "outputs", test_file);
    const data = fs.readFileSync(data_path).toString();
    expect(map[expected_path]).toEqual(data);
  });
});

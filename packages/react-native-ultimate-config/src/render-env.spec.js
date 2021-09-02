const fs = require("fs");
const path = require("path");

const render_env = require("./render-env");

const PROJECT_ROOT = "/home/user1/my_project";
const LIB_ROOT =
  "/home/user1/my_project/node_modules/react-native-ultimate-config";
const D_TS_FILE = `${LIB_ROOT}/index.d.ts`;
const WEB_FILE = `${LIB_ROOT}/index.web.js`;
const JS_OVERRIDE_FILE = `${LIB_ROOT}/override.js`;
const GRADLE_YAML_PATH = `${LIB_ROOT}/android/rnuc.yaml`;
const H_VALUES_FILE = `${LIB_ROOT}/ios/ConfigValues.h`;
const XCCONFIG_FILE = `${PROJECT_ROOT}/ios/rnuc.xcconfig`;
const CONFIG_DEFAULT = {
  MY_VARIABLE: "hello",
  MY_URL: "http://hello.world?howareyoudoing=ok",
  MY_STRING: "string_value",
  MY_NUMBER: 42,
  MY_BOOLEAN: true,
  MY_BOOLEAN_FALSE: false,
  QUOTES: "hello \"world'",
};
const CONFIG_IOS = {
  ...CONFIG_DEFAULT,
  PER_PLATFORM: "hello",
};
const CONFIG_ANDROID = {
  ...CONFIG_DEFAULT,
  PER_PLATFORM: "world",
};
const CONFIG_WEB = {
  ...CONFIG_DEFAULT,
  PER_PLATFORM: "goodbye",
};

describe("render_env default", () => {
  let map = undefined;
  beforeEach(() => {
    map = render_env(PROJECT_ROOT, LIB_ROOT, {
      ios: CONFIG_IOS,
      android: CONFIG_ANDROID,
      web: CONFIG_WEB,
    });
  });
  beforeAll(() => {
    // Mock existsSync to return "true" so that the check for a PROJECT_ROOT/ios
    // directory succeeds and ios project files are generated
    jest.spyOn(fs, "existsSync");
    fs.existsSync.mockReturnValue(true);
  })
  afterAll(() => {
    fs.existsSync.mockRestore();
  })

  it("paths has length of 6", () => {
    const paths = Object.keys(map);
    expect(paths.length).toEqual(6);
  });
  it("returns map of files to write against specifed roots", () => {
    const paths = Object.keys(map);
    expect(paths).toContain(D_TS_FILE);
    expect(paths).toContain(WEB_FILE);
    expect(paths).toContain(GRADLE_YAML_PATH);
    expect(paths).toContain(H_VALUES_FILE);
    expect(paths).toContain(XCCONFIG_FILE);
    expect(paths).toContain(JS_OVERRIDE_FILE);
  });
  it.each`
    expected_path       | test_file
    ${JS_OVERRIDE_FILE} | ${"override_empty.js"}
    ${WEB_FILE}         | ${"index.web.js"}
    ${D_TS_FILE}        | ${"index.d.ts"}
    ${GRADLE_YAML_PATH} | ${"rnuc.yaml"}
    ${H_VALUES_FILE}    | ${"ConfigValues.h"}
    ${XCCONFIG_FILE}    | ${"rnuc.xcconfig"}
  `("correct data for file $expected_path", ({ expected_path, test_file }) => {
    const data_path = path.join(__dirname, "test_outputs", test_file);
    const data = fs.readFileSync(data_path).toString();
    expect(map[expected_path]).toEqual(data);
  });
});

describe("render_env with js override", () => {
  let map = undefined;
  beforeEach(() => {
    map = render_env(
      PROJECT_ROOT,
      LIB_ROOT,
      {
        ios: CONFIG_IOS,
        android: CONFIG_ANDROID,
        web: CONFIG_WEB,
      },
      { js_override: true }
    );
  });
  beforeAll(() => {
    // Mock existsSync to return "true" so that the check for a PROJECT_ROOT/ios
    // directory succeeds and ios project files are generated
    jest.spyOn(fs, "existsSync");
    fs.existsSync.mockReturnValue(true);
  })
  afterAll(() => {
    fs.existsSync.mockRestore();
  })

  it("paths has length of 6", () => {
    const paths = Object.keys(map);
    expect(paths.length).toEqual(6);
  });
  it.each([
    [D_TS_FILE],
    [WEB_FILE],
    [JS_OVERRIDE_FILE],
    [GRADLE_YAML_PATH],
    [H_VALUES_FILE],
    [XCCONFIG_FILE],
  ])("map of files contains path %s", () => {
    const paths = Object.keys(map);
    expect(paths).toContain(D_TS_FILE);
    expect(paths).toContain(WEB_FILE);
    expect(paths).toContain(JS_OVERRIDE_FILE);
    expect(paths).toContain(GRADLE_YAML_PATH);
    expect(paths).toContain(H_VALUES_FILE);
    expect(paths).toContain(XCCONFIG_FILE);
  });
  it.each`
    expected_path       | test_file
    ${D_TS_FILE}        | ${"index.d.ts"}
    ${WEB_FILE}         | ${"index.web.js"}
    ${GRADLE_YAML_PATH} | ${"rnuc.yaml"}
    ${H_VALUES_FILE}    | ${"ConfigValues.h"}
    ${XCCONFIG_FILE}    | ${"rnuc.xcconfig"}
    ${JS_OVERRIDE_FILE} | ${"override.js"}
  `("correct data for file $expected_path", ({ expected_path, test_file }) => {
    const data_path = path.join(__dirname, "test_outputs", test_file);
    const data = fs.readFileSync(data_path).toString();
    expect(map[expected_path]).toEqual(data);
  });
});

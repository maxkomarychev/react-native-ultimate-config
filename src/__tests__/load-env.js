const mockReadFileSync = jest.fn();
jest.doMock("fs", () => ({ readFileSync: mockReadFileSync }));
const mockConfig = jest.fn();
jest.doMock("dotenv", () => ({ config: mockConfig }));
const mockYaml = jest.fn();
jest.doMock("js-yaml", () => ({ safeLoad: mockYaml }));
const load_env = require("../load-env");

describe("load-env", () => {
  beforeEach(() => {
    mockConfig.mockReset();
    mockYaml.mockReset();
    mockReadFileSync.mockReset();
  });
  it("reads dotenv by default", () => {
    mockConfig.mockReturnValueOnce({ parsed: { hello: "world" } });
    const result = load_env("hello");
    expect(mockConfig).toHaveBeenCalledWith({ path: "hello" });
    expect(result).toEqual({ hello: "world" });
  });
  it.each`
    extension
    ${"yml"}
    ${"yaml"}
  `("reads yaml when extension is '$extension'", ({ extension }) => {
    mockReadFileSync.mockReturnValueOnce(new Buffer("data"));
    mockYaml.mockReturnValueOnce({ hello: "world" });
    const result = load_env(`hello.${extension}`);
    expect(mockReadFileSync).toHaveBeenCalledWith(`hello.${extension}`);
    expect(mockYaml).toHaveBeenCalledWith("data");
    expect(result).toEqual({ hello: "world" });
  });
});

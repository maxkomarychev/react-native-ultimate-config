const mockWriteFile = jest.fn();
jest.mock("fs", () => ({ writeFileSync: mockWriteFile }));
const write_env = require("./write-env");

describe("load-env", () => {
  beforeEach(() => {
    mockWriteFile.mockReset();
  });
  it("writes files", () => {
    write_env({ hello: "world", hey: "you" });
    expect(mockWriteFile).toHaveBeenCalledWith("hello", "world");
    expect(mockWriteFile).toHaveBeenCalledWith("hey", "you");
  });
});

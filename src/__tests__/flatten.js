const flatten = require("../flatten");

describe("flatten", () => {
  it("flattens config per platform", () => {
    const config = { value1: "abc", value2: { ios: "def", android: "xyz" } };
    const flat_ios = flatten(config, "ios");
    expect(flat_ios).toEqual({ value1: "abc", value2: "def" });
    const flat_android = flatten(config, "android");
    expect(flat_android).toEqual({ value1: "abc", value2: "xyz" });
  });
});

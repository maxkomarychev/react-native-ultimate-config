const add_types = require("../add-types");

describe("add-types", () => {
  it("adds types", () => {
    expect(
      add_types({
        hello: "world",
        boolean: false,
        number: 42,
        float: 42.42,
      })
    ).toEqual({
      hello: {
        value: "world",
        isString: true,
        isBoolean: false,
        isNumber: false,
        isInteger: false,
      },
      boolean: {
        value: false,
        isString: false,
        isBoolean: true,
        isNumber: false,
        isInteger: false,
      },
      number: {
        value: 42,
        isString: false,
        isBoolean: false,
        isNumber: true,
        isInteger: true,
      },
      float: {
        value: 42.42,
        isString: false,
        isBoolean: false,
        isNumber: true,
        isInteger: false,
      },
    });
  });
});

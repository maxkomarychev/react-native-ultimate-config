const resolve_env = require("./resolve-env");

describe("resolve_env", () => {
  const original = { original: "data" };
  it.each`
    on_env_result | expected
    ${1}          | ${1}
    ${""}         | ${""}
    ${"hello"}    | ${"hello"}
    ${0}          | ${0}
    ${1}          | ${1}
    ${false}      | ${false}
    ${true}       | ${true}
    ${null}       | ${null}
    ${undefined}  | ${original}
  `(
    "when hook returns '$on_env_result' env is resolved to '$expected'",
    async ({ on_env_result, expected }) => {
      const on_env = jest.fn();
      on_env.mockReturnValueOnce(on_env_result);
      expect(await resolve_env(original, { on_env })).toEqual(expected);
    }
  );
});

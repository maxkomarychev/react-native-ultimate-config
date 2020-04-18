function add_types(env) {
  return Object.keys(env).reduce((acc, key) => {
    const value = env[key];
    const type = typeof value;
    return {
      ...acc,
      [key]: {
        value,
        isString: type === "string",
        isBoolean: type === "boolean",
        isNumber: type === "number",
        isInteger: Number.isInteger(value),
      },
    };
  }, {});
}
module.exports = add_types;

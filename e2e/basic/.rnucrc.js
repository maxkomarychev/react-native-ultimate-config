module.exports = {
  on_env: async function (env) {
    return {
      ...env,
      CUSTOM_VARIABLE: 'I am from rc',
    };
  },
};

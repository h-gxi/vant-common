const camelizeRE = /-(\w)/g;
const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase());
function withInstall(options) {
  options.install = (app) => {
    const { name } = options;
    if (name) {
      app.component(name, options);
      app.component(camelize(`-${name}`), options);
    }
  };
  return options;
}
export {
  camelize,
  withInstall
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [] // ← esto debe ser un array vacío si no estás usando ningún plugin
  };
};
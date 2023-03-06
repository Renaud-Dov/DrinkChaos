const { ProvidePlugin, DefinePlugin } = require("webpack");

module.exports = function (config, env) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(m?js|ts)$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      fallback: {
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        crypto: require.resolve("crypto-browserify"),
        fs: false,
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};

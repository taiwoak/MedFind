const webpack = require('webpack');

module.exports = function override(config, env) {
  // Ensure proper fallback for Node.js modules
  config.resolve.fallback = {
    "stream": require.resolve("stream-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
    "process": require.resolve("process/browser"),
  };

  // Add the necessary plugins
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',  // Ensure this path is correct
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};

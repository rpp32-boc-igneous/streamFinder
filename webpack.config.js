const path = require('path');
// future utility for page load optimization
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
  // plugins: [new CompressionPlugin()],
};
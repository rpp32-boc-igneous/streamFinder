// const path = require('path');
// const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: './client/Index.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  mode: 'development',
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
  // plugins: [new CompressionPlugin()],
};
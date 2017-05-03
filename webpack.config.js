/**
 * Dependencies declared
 * @type {Object}
 */
const path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./server/Server.js', './client/src/assets/css/Index.scss'],
  output: { path: __dirname, filename: './client/public/build/Bundle.js' },
  watch: true,
  devServer: {
    contentBase: 'client/public/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader!eslint-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader!css-loader' }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader!css-loader!sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.css']
  }
};

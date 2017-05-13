/**
 * Dependencies declared
 * @type {Object}
 */
const path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  entry: ['./client/src/Index.js', './client/src/style/Index.scss'],
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
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' }
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
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.css', '.jsx']
  },
  resolveLoader: {
      modules: ["node_modules"],
      extensions: ["*", ".js"]
  }
};

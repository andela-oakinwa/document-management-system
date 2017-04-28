const path = require('path'),
webpack = require('webpack');

module.exports = {
  entry: './server/server.js',
  output: { path: __dirname, filename: './public/build/bundle.js' },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
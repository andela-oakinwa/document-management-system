const path = require('path');

module.exports = {
  entry: './server/Server.js',
  output: { path: __dirname, filename: './client/public/build/Bundle.js' },
  watch: true,
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
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: { modules: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.css']
  }
};

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/Index.jsx')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, 'client/'),
    filename: 'Bundle.js',
    publicPath: '/'
  },
  externals: {},
  watch: true,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: [path.join(__dirname, 'client'), path.join(__dirname, 'server/shared')],
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports-loader?jQuery=jquery,$=jquery,hammerjs'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'

      },
      { test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};

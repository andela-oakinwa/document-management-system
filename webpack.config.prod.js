const webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
  };

module.exports = {
  entry: './client/Index',
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/client',
    filename: 'Bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')],
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      },
    ],
  },
  resolve: {
    extensions: [' ', '.js', '.jsx', '.css']
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/Index.jsx')
    ],
  output: { 
    path: '/',
    filename: 'Bundle.js',
    publicPath: '/'
  },
  externals: {
    
  },
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
    loaders:[
      {
        test: /\.jsx$/,
        include: [ path.join(__dirname, 'client'), path.join(__dirname, 'server/shared') ], 
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'
      }
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

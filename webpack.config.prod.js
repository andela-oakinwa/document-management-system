import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  entry: './client/index',
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: [path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')],
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /(\.s?css)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
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

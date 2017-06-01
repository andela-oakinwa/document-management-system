import path from 'path';
import webpack from 'webpack';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};
export default {
  devtool: 'eval-source-map',
  entry: '/client/Index.jsx',
  output: {
    path: '/',
    filename: 'Bundle.js',
    publicPath: '/'
  },
  externals: {
  },
  watch: true,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
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

import path from 'path';
import webpack from 'webpack';

export default {
  devtool: 'eval-source-map',
  entry: [
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
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders:[
      {
        test: /\.jsx$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  }
};

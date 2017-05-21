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
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
      /**{
        test: /\.(jpg|png|svg)$/,
        include: './client/assets/images/dms-home.png',
        loaders: ['file-loader']
      }*/
    ]
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  }
};

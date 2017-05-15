/**
 * Dependencies declared
 */
import path from 'path'
import Webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const extractPlugin = new ExtractTextPlugin ({
  filename: 'Index.css'
});
  
export default {
  entry: ['./client/src/Index.jsx', './client/src/style/Index.scss'],
  output: { 
    path: path.resolve(__dirname, 'client/public/build/'),
    filename: 'Bundle.js',
    publicPath: '/client/public/'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
          { 
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    extractPlugin,
    new Webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss']
  },
  resolveLoader: {
      modules: ['node_modules'],
      extensions: ['*', '.js']
  }
};

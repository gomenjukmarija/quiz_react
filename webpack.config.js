var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './resources/assets/js/index.jsx'
  ],
  output: {
    path: "./public/build",
    publicPath: "http://localhost:5995/_assets/",
    filename: "bundle.js"
  },
  resolve: {
    root: path.join(__dirname, './resources/assets/js'),
    modulesDirectories: ["node_modules"],
    extensions: ["", ".web.js", ".js", ".jsx", '.css', '.less', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },

      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }      
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};







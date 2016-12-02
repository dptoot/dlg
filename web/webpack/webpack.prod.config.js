const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../../');
const buildPath = path.resolve(__dirname, '../', 'public');
const nodeModulesPath = path.resolve(__dirname, '../../', 'node_modules');
const autoprefixer = require('autoprefixer'); 
const jsonImporter = require('node-sass-json-importer');

const config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: './app/web/index.js',
  output: {
    path: buildPath,
    filename: 'bundle-[hash].js'
  },
  module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, "../../web"),
            path.resolve(__dirname, "../../app/web"),
            path.resolve(__dirname, "../../app/engine"),
            path.resolve(__dirname, '../../node_modules/react-native-storage'),
          ],
          loader: 'babel',
        },
        {
          test: /\.json$/,
          include: [
            path.resolve(__dirname, "../../web"),
            path.resolve(__dirname, "../../app/web"),
            path.resolve(__dirname, "../../app/engine"),
          ],
          loader: 'json',
        },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { 
            test: /\.scss$/, 
            loaders: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ]
        },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    },
    sassLoader: {
       // Apply the JSON importer via sass-loader's options.
        importer: jsonImporter,
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
      new CleanWebpackPlugin(buildPath, {
        root: process.cwd(),
      }),
      new HtmlWebpackPlugin({
        template: 'web/webpack/index-template.ejs',
      }),
      new webpack.DefinePlugin({
        '__DEV__': false, // emulate react-native for react-native-storage
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          PLATFORM: JSON.stringify('web'),
          API_HOST: JSON.stringify('http://api-douglovesgames.rhcloud.com'),
          WEBSOCKET_HOST: JSON.stringify('http://api-douglovesgames.rhcloud.com:8000'),
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
}

module.exports = config;
var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, '../', 'public');
var nodeModulesPath = path.resolve(__dirname, '../../', 'node_modules');


var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: './app/web/index.js',
  output: {
    path: buildPath,
    filename: 'bundle.js'
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
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'web': true,
        }
      })
    ]
}

module.exports = config;
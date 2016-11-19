const path = require('path');
const webpack = require('webpack');

module.exports = {
    watch: true,
    devtool: 'eval-source-map',
    entry: [
         'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/web/index.js',
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
        },
        { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'web': true,
        }
      })
    ]
}
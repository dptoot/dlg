const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer'); 
const jsonImporter = require('node-sass-json-importer');

// Set dev flag to mimic react-native for react-native-storage
global.__DEV__ = true;

module.exports = {
    watch: true,
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      devtool: 'eval',
      hot: true,     
      inline: true,
    },
    entry: [
         'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/web/index.js',
    ],
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
        //{ test: /\.css$/, loader: "style-loader!css-loader" },
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
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: 'web/webpack/index-template.ejs',
      }),
      new webpack.DefinePlugin({
        '__DEV__': true, // emulate react-native for react-native-storage
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          PLATFORM: JSON.stringify('web'),
          API_HOST: JSON.stringify('http://localhost:3000'),
          WEBSOCKET_HOST: JSON.stringify('http://localhost:3000'),
        }
      })
    ]
}
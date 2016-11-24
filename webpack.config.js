const pkg = require('./package');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const environment = process.env.NODE_ENV;
const vendor = Object.keys(pkg.dependencies).map((item) => item);
const isDevelopment = environment !== 'release';

module.exports = {
  context: path.join(__dirname, './'),

  devtool: 'source-map',

  debug: isDevelopment,

  entry: ['./src/index.js'],

  output: {
    path: path.join(__dirname, '/assets/js'),
    filename: pkg.name + '.js',
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    modules: ['src', 'node_modules'],
  },

  module: {
    noParse: vendor,
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss'),
        exclude: /(node_modules)/,
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin(`${pkg.name}.css`, { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendor', `${pkg.name}.vendor.js`),
  ],

  postcss(webpackInstance) {
    return [
      require('postcss-import')({
        addDependencyTo: webpackInstance,
        root: path.join(__dirname, './'),
        path: [
          path.join(__dirname, './'),
          path.join(__dirname, './src'),
          path.join(__dirname, './test'),
        ],
      }),
      require('postcss-cssnext')(),
      require('postcss-reporter')({ clearMessages: true }),
    ];
  },

  watch: isDevelopment,
};

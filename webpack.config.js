var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: '/'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "")
        ],
      }
    ],
    loaders: [
      {
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, "")
        ]
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader",
        include: [
            path.resolve(__dirname,"")
        ]
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  }
  // ,
  // watch: true,
  // watchOpt:{
  //   aggregateTimeout: 100
  // }
};

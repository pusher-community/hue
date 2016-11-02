const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry: './src/js/index.js',
  output: {
    path: './build/',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [{
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loader: 'file-loader?name=./[hash].[ext]'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'es2017']
      }
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['IE 10', 'IE 11', 'firefox 20', 'ios_saf 8.4', 'android 4.3'] })
  ],
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true })
  ]
}

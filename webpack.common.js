require('dotenv').config()

const webpack = require('webpack')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    alias: {
      resources: path.resolve(__dirname, 'resources')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true
            }
          }
        ]
      }
    ]
  },
  entry: './src/index.jsx',
  output: {
    filename: 'main.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'CompLeap'
    }),
    new webpack.DefinePlugin({
      'process.env.CONTEXT_VERSION': JSON.stringify('20'),
      'process.env.DEFAULT_LANGUAGE': JSON.stringify('en'),
      'process.env.MIN_INTERESTS': JSON.stringify(3),
      'process.env.MAX_INTERESTS': JSON.stringify(10),
      'process.env.RECOMMENDATION_CTA_BASE_URL': JSON.stringify(process.env.RECOMMENDATION_CTA_BASE_URL),
      'process.env.USE_PERSISTENCE': JSON.stringify(process.env.USE_PERSISTENCE)
    })
  ]
}

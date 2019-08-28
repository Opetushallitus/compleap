require('dotenv').config()

const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    compress: true,
    disableHostCheck: true,
    port: 8080
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MOCK_API_LATENCY_MS': JSON.stringify(1000),
      'process.env.RECOMMENDATIONS_ENDPOINT': JSON.stringify(process.env.RECOMMENDATIONS_ENDPOINT)
    })
  ]
})

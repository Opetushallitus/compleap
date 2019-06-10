const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MOCK_API_LATENCY_MS': JSON.stringify(500),
      'process.env.API_ENDPOINT': JSON.stringify('https://api.compleap.testiopintopolku.fi/v2/match'),
      'process.env.ALTERNATIVE_API_ENDPOINT': JSON.stringify('https://api.compleap.testiopintopolku.fi/v1/match')
    })
  ]
})

module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', {
      'targets': {
        'browsers': [
          '> 0.5%',
          'last 3 versions',
          'IE >= 11',
          'not dead'
        ]
      }
    }],
    '@babel/preset-react'
  ]

  const plugins = [
    ['@babel/plugin-transform-runtime', {
      'regenerator': true
    }]
  ]

  return {
    presets,
    plugins
  }
}

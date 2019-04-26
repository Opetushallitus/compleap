module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', {
      targets: {
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

  const plugins = []

  if (process.env.NODE_ENV === 'production') plugins.push(['transform-remove-console'])

  return {
    presets,
    plugins
  }
}

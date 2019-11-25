process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

if (!module.hot)
  environment.loaders.get('sass').use.find(
    item => item.loader === 'sass-loader'
  ).options.sourceMapContents = false

module.exports = environment.toWebpackConfig()

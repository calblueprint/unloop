const { environment } = require('@rails/webpacker')

environment.loaders.prepend("babel-loader", {
  test: /\.jsx$|\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader"
    }
  ]
});

module.exports = environment

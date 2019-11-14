import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'

module.exports = (env, options) => {
  const { mode } = options
  process.env.NODE_ENV = mode === 'production' ? mode : 'development'

  let config = {
    mode,
    devServer: {
      port: process.env.PORT || 8080,
    },
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
  }

  if (mode === 'production') {

  } else {
    config = merge(config, {
      devServer: {
        overlay: true
      }
    })
  }

  return config
}

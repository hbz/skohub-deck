import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = (env, options) => {
  const { mode } = options
  process.env.NODE_ENV = mode === 'production' ? mode : 'development'

  const config = {
    mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
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
      new HtmlWebpackPlugin()
    ]
  }
  return config
}

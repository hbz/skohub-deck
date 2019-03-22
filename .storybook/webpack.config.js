module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loaders: [require.resolve("@storybook/addon-storysource/loader")],
        enforce: "pre"
      }
    ]
  }
}
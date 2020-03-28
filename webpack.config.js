const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    archive: './src/index.tsx',
    background: './src/background.js'
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'awesome-typescript-loader' }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new CheckerPlugin(),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Archive',
      template: 'src/archive.ejs',
      filename: 'archive.html'
    }),
    new CopyPlugin([
      { from: 'src/extension_specifics' },
      { from: 'assets' }
    ])
  ],
  devServer: {
    stats: 'errors-only',
    overlay: false,
    inline: false,
    liveReload: false,
    historyApiFallback: false,
    writeToDisk: true,
    hot: false,
    // Use host 0.0.0.0 for Docker
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT // Defaults to 8080
  }
}

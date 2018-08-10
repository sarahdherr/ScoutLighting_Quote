const isDev = process.env.NODE_ENV === 'development'
var webpack = require('webpack')

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
    // test: /\.xxx$/, // may apply this only for some modules
      options: {
        vendor: [
          'xlsx',
          'file-saver'
        ]
      }
    })
  ],
  node: {fs: 'empty'},
  externals: [
    {'./cptable': 'var cptable'},
    {'./jszip': 'jszip'}
  ]
}

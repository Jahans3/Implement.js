const path = require('path')
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'implements.js',
    path: path.resolve(__dirname, 'lib')
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-es2015-parameters', 'transform-object-rest-spread']
          }
        }
      }
    ]
  }
}
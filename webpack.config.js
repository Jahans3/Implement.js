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
  ]
}
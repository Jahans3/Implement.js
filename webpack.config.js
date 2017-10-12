const path = require('path')
const { DefinePlugin } = require('webpack')
// const env = require('./env')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'implements.js',
    path: path.resolve(__dirname, 'lib')
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    })
  ]
}
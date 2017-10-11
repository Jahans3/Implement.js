const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'implements.js',
    path: path.resolve(__dirname, 'lib')
  }
}
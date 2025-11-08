const path = require('path');

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [{ test: /\.ts$/i, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
};

module.exports = config;

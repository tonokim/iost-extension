const webpack = require('webpack')
const InjectPlugin = require('./webpack.plugin.inject.js')
const { getEntry, getOutput, getHTMLPlugins, getCopyPlugins } = require('./webpack.utils');


const config = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['babel-plugin-static-fs']
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ]
  }
}

module.exports = {
  ...config,
  entry: getEntry(),
  output: getOutput(),
  plugins: [
    new InjectPlugin(config),
    ...getHTMLPlugins(),
    ...getCopyPlugins(),
  ]
}
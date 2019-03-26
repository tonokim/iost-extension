const webpack = require('webpack')
const InjectPlugin = require('./webpack.plugin.inject.js')
const { getEntry, getOutput, getHTMLPlugins, getCopyPlugins, getZipPlugin } = require('./webpack.utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');

const config = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
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


const browserDirs = ['chrome', 'opera', 'firefox']

module.exports = browserDirs.map(browserDir => {
  return {
    ...config,
    entry: getEntry(),
    output: getOutput(browserDir,'temp'),
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'dist'), path.join(process.cwd(), 'temp')],
      }),
      new InjectPlugin(config, browserDir),
      ...getHTMLPlugins(browserDir,'temp'),
      ...getCopyPlugins(browserDir, 'temp'),
      getZipPlugin(browserDir),
    ]
  }
})
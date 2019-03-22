
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

const getEntry = (sourceDir = 'src') => {
  return {
    popup: path.resolve(__dirname, `${sourceDir}/popup/popup.js`),
    options: path.resolve(__dirname, `${sourceDir}/options/options.js`),
    prompts: path.resolve(__dirname, `${sourceDir}/prompts/prompts.js`),
    content: path.resolve(__dirname, `${sourceDir}/content/content.js`),
    background: path.resolve(__dirname, `${sourceDir}/background/background.js`),
    hotreload: path.resolve(__dirname, `${sourceDir}/utils/hot-reload.js`),
  };
};

const getOutput = (outputDir = 'dev') => {
  return {
    path: path.resolve(__dirname, outputDir),
    filename: '[name]/[name].js',
  };
};

const getHTMLPlugins = (outputDir = 'dev', sourceDir = 'src') => [
  new HtmlWebpackPlugin({
    title: 'Popup',
    filename: path.resolve(__dirname, `${outputDir}/popup/index.html`),
    template: `${sourceDir}/popup/index.html`,
    chunks: ['popup'],
  }),
  new HtmlWebpackPlugin({
    title: 'Options',
    filename: path.resolve(__dirname, `${outputDir}/options/index.html`),
    template: `${sourceDir}/options/index.html`,
    chunks: ['options'],
  }),
  new HtmlWebpackPlugin({
    title: 'Prompts',
    filename: path.resolve(__dirname, `${outputDir}/prompts/index.html`),
    template: `${sourceDir}/prompts/index.html`,
    chunks: ['prompts'],
  }),
];

const getCopyPlugins = (outputDir = 'dev', sourceDir = 'src') => [
  new CopyWebpackPlugin([
    { from: `${sourceDir}/assets`, to: path.resolve(__dirname, `${outputDir}/assets`) },
    { from: `${sourceDir}/_locales`, to: path.resolve(__dirname, `${outputDir}/_locales`) },
    { from: `${sourceDir}/manifest.json`, to: path.resolve(__dirname, `${outputDir}/manifest.json`) },
  ]),
];

module.exports = {
  getEntry,
  getOutput,
  getHTMLPlugins,
  getCopyPlugins
};

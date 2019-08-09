const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(
                  __dirname,
                  './node_modules/bootstrap/scss/_functions.scss',
                ),
                path.resolve(
                  __dirname,
                  './node_modules/bootstrap/scss/_variables.scss',
                ),
              ],
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './favicon.ico',
      template: './index.html',
      filename: './index.html',
    }),
    new CheckerPlugin(),
    new TSLintPlugin({
      files: [
        './src/**/*.tsx',
        './src/**/*.ts',
        './test/**/*.tsx',
        './test/**/*.ts',
      ],
    }),
    new StyleLintPlugin(),
  ],
};

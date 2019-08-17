const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TSLintPlugin = require('tslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: ['babel-polyfill', './index.tsx'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
        ],
      },
      {
        test: /\.(sv|pn)g$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: './favicon.ico',
      template: './index.html',
      filename: './index.html',
    }),
    new TSLintPlugin({
      files: [
        './src/**/*.tsx',
        './src/**/*.ts',
        './test/**/*.tsx',
        './test/**/*.ts',
      ],
    }),
    new StyleLintPlugin(),
    new DotEnv(),
    new CleanWebpackPlugin(),
  ],
};

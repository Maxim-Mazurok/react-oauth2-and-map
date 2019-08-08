const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
  devtool: "source-map",
  context: path.join(__dirname, "src"),
  entry: "./index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "awesome-typescript-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file?name=[name].[ext]'
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      favicon: "./favicon.ico",
      template: "./index.html",
      filename: "./index.html"
    }),
    new CheckerPlugin(),
  ],
};

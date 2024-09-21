const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    vendor: "./src/app/vendor.ts",
    index: "./src/app/index.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      "fs": false,
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/app"),
    clean: true,
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/app/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "dist/components"),
          to: path.resolve(__dirname, "dist/app/components"),
        },
        {
          from: path.resolve(__dirname, "dist/components.json"),
          to: path.resolve(__dirname, "dist/app/components.json"),
        },
      ],
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "./fonts/[name][ext]",
        },
      },
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ]
  },
}
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    vendor: "./src/app/vendor.ts",
    index: "./src/app/index.ts",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "./dist/"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/app/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/components/_assets/",
          to: "./components/assets/",
        },
        {
          from: "./assets/pitch.svg",
          to: "./pitch-logo.svg",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
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
          filename: "./fonts/[contenthash][ext]",
        },
      },
      {
        test: /\.s?css$/,
        exclude: path.resolve(__dirname, "src/components"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
      new TerserPlugin,
    ],
    minimize: true,
  },
}
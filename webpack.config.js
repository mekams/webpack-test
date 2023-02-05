const path = require("path");
const webpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyserPlugin =require('webpack-bundle-analyser').BundleAnalyserPlugin

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    //middleware used for proxy request through specified index page --History API makes it possible to change the URL in the browser, using JavaScript
    historyApiFallback: true,
  },
  devtool: "source-map", //good for debugging in browser
  output: {
    path: path.resolve(__dirname, "dist"),
    //filename will aways be bundle & contenthash helps in caching
    filename: "[name][contenthash].js",
    clean: true, //multiple files on build remove
    assetModuleFilename: "[name].[ext]",
  },
  module: {
    rules: [
      {
        //start * and end with $
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  //used for creating a build in case deleted  with user required format
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Application",
      filename: "index.html",
      template: "src/template.html",
    }),
    // new BundleAnalyserPlugin(),
  ],
};

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcPath = path.join(__dirname, "src");
const buildPath = path.join(__dirname, "build");
const imageFileExts = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  context: srcPath,
  entry: {
    content: "./content/content.js",
    background: "./background/background.js",
    options: "./option_ui/options.jsx"
  },
  output: {
    path: buildPath,
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modeles/,
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: new RegExp(".(" + imageFileExts.join("|") + ")$"),
        loader: "file-loader?name=icons/[name].[ext]",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new CopyWebpackPlugin([{
      from: "./manifest.json",
      to: "./manifest.json",
      transform(content, path) {
        return Buffer.from(JSON.stringify({
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString())
        }, null, 2));
      }
    }]),
    new HtmlWebpackPlugin({
      chunks: [
        "background"
      ],
      filename: "html/background.html"
    }),
    new HtmlWebpackPlugin({
      chunks: [
        "options"
      ],
      filename: "html/options.html",
      template: "./option_ui/options.html"
    })
  ]
};

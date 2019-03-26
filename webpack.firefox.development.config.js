const path = require("path");
const getCommonConfig = require("./webpack.common.config.js");

const srcPath = path.join(__dirname, "src");
const buildPath = path.join(__dirname, "build");

const config = {
  mode: "development",
  devtool: "inline-source-map",
  ...getCommonConfig(srcPath, buildPath)
};

module.exports = config;

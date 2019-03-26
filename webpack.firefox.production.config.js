const path = require("path");
const getCommonConfig = require("./webpack.common.config.js");

const srcPath = path.join(__dirname, "src");
const outputPath = path.join(__dirname, "release");

const config = {
  mode: "production",
  ...getCommonConfig(srcPath, outputPath)
};

module.exports = config;

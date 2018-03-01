const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: {
    global: "./scripts/global.js",
    analytics: "./scripts/analytics.js"
  },
  output: {
    path: path.resolve(__dirname, "web/dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      { test: /\.vue$/, loader: "vue-loader" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("commons"),
    new ExtractTextPlugin("styles.css")
  ]
};

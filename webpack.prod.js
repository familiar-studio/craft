const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const glob = require("glob-all");
const path = require("path");

const PurgecssPlugin = require("purgecss-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = merge(common, {
  resolve: {
    alias: {
      vue: "vue/dist/vue.min.js"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin(),
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, "templates/**/*.twig"),
        path.join(__dirname, "scripts/**/*.vue")
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["twig", "js", "php", "vue"]
        }
      ]
    })
  ]
});

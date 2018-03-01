const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = merge(common, {
  resolve: {
    alias: {
      vue: "vue/dist/vue.js"
    }
  },
  plugins: [
    new BrowserSyncPlugin({
      files: ["./templates/**/*.*"],
      watchTask: true,
      port: 3000
    })
  ]
});

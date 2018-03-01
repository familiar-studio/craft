module.exports = {
  plugins: [
    require("postcss-for"),
    require("postcss-import"),
    require("tailwindcss")("./css/tailwind.config.js"),
    require("postcss-cssnext"),
    require("cssnano")({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};

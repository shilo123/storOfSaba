const { defineConfig } = require("@vue/cli-service");
//vue.config.js
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "bootstrap/scss/bootstrap";`,
      },
    },
  },
});

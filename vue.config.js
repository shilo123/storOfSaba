const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "node_modules/webpack/node_modules/schema-utils/dist/validate.js";`,
      },
    },
  },
});

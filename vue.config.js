const path = require("path");

const { defineConfig } = require("@vue/cli-service");
//vue.config.js
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // הגדר את המניפסט של האפליקציה
    manifestOptions: {
      display: "standalone",
      start_url: "/",
      // ...הוסף עוד הגדרות לפי הצורך
    },

    // הגדרת Workbox
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/registerServiceWorker.js", // נתיב יחסי לקובץ Service Worker בפרויקט המצוי
      swDest: "registerServiceWorker.js",
    },
  },
});

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
      swSrc: path.resolve(__dirname, "src/registerServiceWorker.js"),
      swDest: "registerServiceWorker.js", // הנתיב לקובץ ה-Service Worker בפרויקט המצוי
    },
  },
});

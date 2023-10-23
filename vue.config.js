const { defineConfig } = require("@vue/cli-service");

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
      swSrc: "src/service-worker.js",
      swDest: "service-worker.js", // הנתיב לקובץ ה-Service Worker בפרויקט המצוי
    },
  },
});

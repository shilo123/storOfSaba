<template>
  <div id="app">
    <router-view class="ro" style="width: 140%" />
    <router-view class="so" style="width: 100%" />
  </div>
</template>

<style>
@media screen and (max-width: 1000px) {
  .so {
    display: none;
  }
  .ro {
    display: inline;
  }
}
@media screen and (min-width: 1000px) {
  .so {
    display: inline;
  }
  .ro {
    display: none;
  }
}
</style>
